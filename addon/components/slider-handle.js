import Component from '@ember/component';
import layout from '../templates/components/slider-handle';

export default Component.extend({
  layout,
  classNames: 'slider-handle',
  onMove() {},
  panStart() {
    this.onStart(event);
  }
});
