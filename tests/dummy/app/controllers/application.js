import Controller from '@ember/controller';
import Object from '@ember/object';

export default Controller.extend({
    options: Object.create({
        type: 'closed',
        hideValue: false,
        range: {
            min: 0,
            max: 100
        },
        // likert: {
        //     enabled: true,
        //     points: 5,
        //     labels: [
        //         'Very poor ',
        //         'Poor',
        //         'Average',
        //         'Good',
        //         'Very good'
        //     ]
        // }
    }),
    actions: {
        toggleValueDisplay() {
            this.toggleProperty('options.hideValue');
        },
        addActiveClass() {
            event.target.classList.add('active');
        },
        removeActiveClass() {
            event.target.classList.remove('active');
        },
        toggleSliderType() {
            if (this.get('options.type') === 'closed') {
                this.set('options.type', 'sleek');
            } else {
                this.set('options.type', 'closed');
            }
        }
    }
});
