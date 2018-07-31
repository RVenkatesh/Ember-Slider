// Controller file
import Controller from '@ember/controller';
import Object from '@ember/object';

export default Controller.extend({
    // config options to be passed to the slider component
    options: Object.create({
        // Likert scale ideally needs no value to be shown if labels are provided
        // hence configure 'hideValue' to true
        hideValue: true,
        likert: {
            enabled: true,
            // Number of points to be shown in the slider. It can be 3, 5 or 7
            points: 5,
            // Labels for each of the five points can be given as array
            labels: [
                'Very poor ',
                // Pass value as null if no label needs to be shown for a particular point
                null,
                'Average',
                null,
                'Very good'
            ]
        }
    })
});
