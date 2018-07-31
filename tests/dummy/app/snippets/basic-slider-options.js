// Controller file
import Controller from '@ember/controller';
import Object from '@ember/object';

export default Controller.extend({
    // config options to be passed to the slider component
    options: Object.create({
        type: 'closed',
        hideValue: false,
        range: {
            min: 0,
            max: 100
        }
    })
});
