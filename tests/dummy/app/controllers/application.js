import Controller from '@ember/controller';
import Object from '@ember/object';

export default Controller.extend({
    options: Object.create({
        type: {
            closed: true
        },
        noValue: false,
        range: {
            min: 0,
            max: 100
        }
    }),
    actions: {
        toggleValueDisplay() {
            this.toggleProperty('options.noValue');
        },
        addActiveClass() {
            event.target.classList.add('active');
        },
        removeActiveClass() {
            event.target.classList.remove('active');
        },
        toggleSliderType() {
            this.toggleProperty('options.type.closed');
        },
    }
});
