import Component from '@ember/component';
import layout from '../templates/components/ember-slider';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import { next } from '@ember/runloop';

const LIKERT_DEFAULT = 3;

export default Component.extend(RecognizerMixin, {
  layout,
  classNames: 'ember-slider',
  recognizers: 'pan tap',
  classNameBindings: [
    'config.type', 
    'config.type.closed', 
    'config.noValue', 
    'config.hideValue', 
    'sliding', 
    'leftClosing', 
    'rightClosing', 
    'animate', 
    'likertEnabled'
  ],
  likertPoints: null,
  config: null,
  initialValue: null,
  value: null,
  onChange() {},
  init() {
    this._super(...arguments);

    if (this.get('config.likert.enabled')) {
      this.set('likertEnabled', true);
      this.generateLikertPoints();
    } else {
      // Copy config for easier use
      this.set('min', this.get('config.range.min') || 0);
      this.set('max', this.get('config.range.max') || 100);
    }
  },
  didInsertElement() {
    this._super(...arguments);

    // Cache all the dom elements to reuse
    this.set('SLIDER_PATH', this.element.querySelector('.slider-path'));
    this.set('SLIDER_HANDLE', this.element.querySelector('.slider-handle'));
    this.set('SLIDER_COLOR_FILLER', this.element.querySelector('.slider-color-filler'));
    this.set('SLIDER_COLOR_FILLER_CLOSED', this.element.querySelector('.slider-color-filler-closed'));
    this.moveToInitialValue();
  },
  // Saves the handle position at present to the component variable
  // and then reuse it to during the events like sliding to easily
  // work with the state of the slider before the event started
  lockHandlePosition() {
    let handle_left = parseInt(this.get('SLIDER_HANDLE').offsetLeft);
    this.set('_LOCKED_HANDLE_POSITION', handle_left);
  },

  // WARNING: DO NOT TOUCH THIS UNLESS NECESSARY
  // This is the core function of this component which takes care of moving the handle
  // and updating the value based on the required movement percentage
  moveToPercentage(percentage, animate) {
    if (animate) {
      this.set('animate', true);
    } else {
      this.set('animate', false);
    }

    let { min, 
      max, SLIDER_HANDLE,
      SLIDER_COLOR_FILLER,
      SLIDER_COLOR_FILLER_CLOSED
    } = this.getProperties('min', 'max','SLIDER_HANDLE', 'SLIDER_COLOR_FILLER', 'SLIDER_COLOR_FILLER_CLOSED');
    
    let difference  = max - min;
     // Make sure the percentage value stays within its boundaries
    if (percentage <= 0) {
      percentage = 0;
    } else if (percentage >= 100) {
      percentage = 100;
    }

    // Update the value based on the percentage
    let newValue = Math.round(min + (percentage * difference) / 100);
    this.set('value', newValue);

    // Store percentage for easy usage
    this.set('_percentage', percentage);
    // Move the handle to the corresponding percentage
    let percentageString = percentage + '%';
    SLIDER_HANDLE.style.left = percentageString;
    SLIDER_COLOR_FILLER.style.width = percentageString;
    SLIDER_COLOR_FILLER_CLOSED.style.width = percentageString;
  },

  // Move the handle to a given px value
  // Assumption: The pixel value is relative to the slider div
  // which means it is the distance in px from the left most point of the slider
  moveToPX(positionInPX, animate) {
    let SLIDER_PATH = this.get( 'SLIDER_PATH');
    let pathWidth = SLIDER_PATH.offsetWidth;
    // Calculate the percentage corresponding to the position in px
    let movedPercentage = (positionInPX / pathWidth) * 100;

    this.moveToPercentage(movedPercentage, animate);
  },

  // Move the handle based on the given slider value
  // If the slider is likert, then the automatically move to nearest likert point
  moveToValue(value, animate) {
    let {min, max} = this.getProperties('min', 'max');
    let difference = max - min;
    // Calculate the percentage corresponding to the value of the slider
    let percentage = (value - min) * 100 / difference;

    if (this.get('likertEnabled')) {
      this.moveToLikertByPercentage(percentage, animate);
    } else {
      this.moveToPercentage(percentage, animate);
    }
  },

  // Move the slider to the initialValue passed to the component
  moveToInitialValue(animate) {
    let {initialValue, min} = this.getProperties('initialValue', 'min');
    // Make sure the initial value is properly set otherwise move to the min
    let value = typeof initialValue !== 'number' ? min : initialValue;
    this.moveToValue(value, animate);
  },

  moveToLikertPointFromPX(positionInPX, animate) {
    let SLIDER_PATH = this.get('SLIDER_PATH');
    let pathWidth = SLIDER_PATH.offsetWidth,
      // Calculate the percentage corresponding to the position in px
      movedPercentage = (positionInPX / pathWidth) * 100;
    
    this.moveToLikertByPercentage(movedPercentage, animate);
  },

  moveToLikertByPercentage(percentage, animate) {
    let distance = this.get('likertDistance'),
      percentageToMove = Math.round(percentage / distance) * distance;

      // Get only the percentage in multiples of distance to make sure
      // the handle always lands in one of the likert points
      // Move always to the nearest likert point
      this.moveToPercentage(percentageToMove, animate);
  },

  generateLikertPoints() {
    let totalPoints = this.get('config.likert.points') || LIKERT_DEFAULT,
      labels = this.get('config.likert.labels'),
      points = [],
      distance = 100 / (totalPoints - 1);
    this.set('likertDistance', distance);
    this.set('min', 0);
    this.set('max', totalPoints - 1);
    for(let counter = 0; counter < totalPoints; counter++) {
      // Based on the distance between likert points, generate data for likert points
      // with amount of 'left' value to given to each of them
      points.push({
        left: counter * distance,
        label: labels ? labels[counter] || '': ''
      });
    }
    this.set('likertPoints', points);
  },

  // Add classes to the slider based on whether the handle is closer to left end or right end
  // addClosenessClass(positionInPX, pathWidth) {
  //   if (positionInPX < 50) {
  //     this.set('leftClosing', true);
  //     this.set('rightClosing', false);
  //   } else if (pathWidth - positionInPX < 50) {
  //     this.set('rightClosing', true);
  //     this.set('leftClosing', false);
  //   } else {
  //     this.set('rightClosing', false);
  //     this.set('leftClosing', false);
  //   }
  // },

  tap(event) {
    let tapPosition = event.gesture.srcEvent.pageX;
    let sliderPathLeft = this.get('SLIDER_PATH').getBoundingClientRect().left;
    // Get old value to be passed to onchange event
    let oldValue = this.get('value');
    if (this.get('likertEnabled')) {
      this.moveToLikertPointFromPX(tapPosition - sliderPathLeft, true);
    } else {
      this.moveToPX(tapPosition - sliderPathLeft, true);
    }
    this.get('onChange')(oldValue, this.get('value'));
  },

  panStart() {
    this.lockHandlePosition();
  },
  panMove(event) {
    if (!this.get('sliding')) {
      return;
    }
    let gesture = event.gesture;
    // Since hammer through ember-gestures is only giving us the total movement 
    // for the current event, we need to take only the handle position before the 
    // event started.
    let _LOCKED_HANDLE_POSITION = this.get('_LOCKED_HANDLE_POSITION');
    // Get old value to be passed to onchange event
    let oldValue = this.get('value');

    this.moveToPX(_LOCKED_HANDLE_POSITION + gesture.deltaX);
    this.get('onChange')(oldValue, this.get('value'));
  },
  panEnd() {
    let sliding = this.get('sliding');
    this.set('sliding', false);
    // Do this to get 'sliding' class properly removed before adding animate class
    // since both these are not designed in a way to work together
    next(this, function() {
      if (this.get('likertEnabled') && sliding) {
        this.moveToValue(this.get('value'), true);
      }
    });
    this.lockHandlePosition();
  },
  actions: {
    handleMoveStart(self) {
      // Make this boolean 'true', in order to make sure we are capturing pan event
      // which originated from the handle
      self.set('sliding', true);
    }
  }
});
