import Component from '@ember/component';
import layout from '../templates/components/ember-slider';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Component.extend(RecognizerMixin, {
  layout,
  classNames: 'ember-slider',
  recognizers: 'pan tap',
  classNameBindings: ['config.type.closed', 'config.noValue', 'sliding', 'leftClosing', 'rightClosing', 'animate'],
  config: null,
  initialValue: null,
  value: null,
  onChange() {},
  init() {
    this._super(...arguments);

    // Copy config for easier use
    this.set('min', this.get('config.range.min') || 0);
    this.set('max', this.get('config.range.max') || 100);
  },
  didInsertElement() {
    this._super(...arguments);

    // Cache all the dom elements to reuse
    this.set('SLIDER_PATH', this.$('.slider-path'));
    this.set('SLIDER_HANDLE', this.$('.slider-handle'));
    this.set('SLIDER_COLOR_FILLER', this.$('.slider-color-filler'));
    this.set('SLIDER_COLOR_FILLER_CLOSED', this.$('.slider-color-filler-closed'));
    this.moveToInitialValue();
  },
  lockHandlePosition() {
    let handle_left = parseInt(this.get('SLIDER_HANDLE').position().left);
    this.set('_LOCKED_HANDLE_POSITION', handle_left);
  },

  moveHandle(positionInPX, animate) {
    if (animate) {
      this.set('animate', true);
    } else {
      this.set('animate', false);
    }
    let {min, 
      max, 
      SLIDER_PATH, 
      SLIDER_HANDLE,
      SLIDER_COLOR_FILLER,
      SLIDER_COLOR_FILLER_CLOSED
    } = this.getProperties('min', 'max', 'SLIDER_PATH', 'SLIDER_HANDLE', 'SLIDER_COLOR_FILLER', 'SLIDER_COLOR_FILLER_CLOSED');
    
    let difference  = max - min;
    let pathWidth = SLIDER_PATH.width();

    let movedPercentage = (positionInPX / pathWidth) * 100;

    // Make sure the percentage value stays within its boundaries
    if (movedPercentage <= 0) {
      movedPercentage = 0;
    } else if (movedPercentage >= 100) {
      movedPercentage = 100;
    }

    let newValue = Math.round(min + (movedPercentage * difference) / 100);
    
    this.get('onChange')(this.get('value'), newValue);
    this.set('value', newValue);
    let percentageString = movedPercentage + '%';
    SLIDER_HANDLE.css('left', percentageString);
    SLIDER_COLOR_FILLER.css('width', percentageString);
    SLIDER_COLOR_FILLER_CLOSED.css('width', percentageString);
    // this.addClosenessClass(positionInPX, pathWidth);
  },

  moveToInitialValue() {
    // Right now this whole function looks ridiculous, 
    // because value to percentage and percentage to value conversion happens
    // Change this when the time comes
    let {initialValue, min, max, SLIDER_PATH} = this.getProperties('initialValue', 'min', 'max', 'SLIDER_PATH');
    let difference = max - min;
    let pathWidth = SLIDER_PATH.width();
    initialValue = initialValue === null ? min : initialValue;
    let percentage = (initialValue - min) * 100 / difference;
    let positionInPX = percentage * pathWidth / 100;

    this.moveHandle(positionInPX);
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
    let tapPosition = event.originalEvent.gesture.srcEvent.pageX;
    let sliderPathLeft = this.get('SLIDER_PATH').offset().left;

    this.moveHandle(tapPosition - sliderPathLeft, true);
  },

  panStart() {
    this.lockHandlePosition();
  },
  panMove(event) {
    if (!this.get('sliding')) {
      return;
    }
    let gesture = event.originalEvent.gesture;
    let _LOCKED_HANDLE_POSITION = this.get('_LOCKED_HANDLE_POSITION');
    this.moveHandle(_LOCKED_HANDLE_POSITION + gesture.deltaX);
  },
  panEnd() {
    this.lockHandlePosition();
    this.set('sliding', false);
  },
  actions: {
    handleMoveStart() {
      this.set('sliding', true);
    }
  }
});
