import Ember from 'ember';
import layout from '../templates/components/ember-slider';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  layout,
  classNames: 'ember-slider',
  recognizers: 'pan tap',
  classNameBindings: 'config.type.closed',
  config: {},
  value: 0,
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
  },
  lockHandlePosition() {
    let handle_left = parseInt(this.get('SLIDER_HANDLE').position().left);
    this.set('_LOCKED_HANDLE_POSITION', handle_left);
  },

  // tap(event) {
  //   let gesture = event.originalEvent.gesture.srcEvent.offsetX;
  // },

  panStart() {
    this.lockHandlePosition();
  },
  panMove(event) {
    if (!this.get('panWithHandle')) {
      return;
    }
    let gesture = event.originalEvent.gesture;
    let {min, 
      max, 
      SLIDER_PATH, 
      _LOCKED_HANDLE_POSITION,
      SLIDER_HANDLE,
      SLIDER_COLOR_FILLER,
      SLIDER_COLOR_FILLER_CLOSED
    } = this.getProperties('min', 'max', 'SLIDER_PATH', '_LOCKED_HANDLE_POSITION', 'SLIDER_HANDLE', 'SLIDER_COLOR_FILLER', 'SLIDER_COLOR_FILLER_CLOSED');
    
    let difference  = max - min;
    let path_width = SLIDER_PATH.width();

    let movedPercentage = ((gesture.deltaX + _LOCKED_HANDLE_POSITION) / path_width) * 100;

    // Make sure the percentage value stays within its boundaries
    if (movedPercentage <= 0) {
      movedPercentage = 0;
    } else if (movedPercentage >= 100) {
      movedPercentage = 100;
    }

    let newValue = Math.round(min + (movedPercentage * difference) / 100);
    
    this.set('value', newValue);
    SLIDER_HANDLE.css('left', movedPercentage + '%');
    SLIDER_COLOR_FILLER.css('width', movedPercentage + '%');
    SLIDER_COLOR_FILLER_CLOSED.css('width', `calc(${movedPercentage}% - 15px)`);
  },
  panEnd() {
    this.lockHandlePosition();
    this.set('panWithHandle', false);
  },
  actions: {
    handleMoveStart() {
      this.set('panWithHandle', true);
    }
  }
});
