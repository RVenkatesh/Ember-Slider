import Controller from '@ember/controller';
import Object from '@ember/object';

export default Controller.extend({
    options: Object.create({
        type: {
            closed: true
        },
        noValue: false,
        range: {
            min: 10,
            max: 20
        }
    })
});
