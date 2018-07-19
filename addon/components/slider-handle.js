import Ember from 'ember';
import layout from '../templates/components/slider-handle';

export default Ember.Component.extend({
  layout,
  classNames: 'slider-handle',
  onMove() {},
  panStart() {
    this.get('onStart')(event);
  },
  panMove(event) {
    this.get('onMove')(event);
  },
  panEnd() {
    this.get('onEnd')(event);
  }
});
