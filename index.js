/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,
  /*
    Without this, Ember CLI will throw an error when trying to serve the dummy test application or building distributables:

    Cannot read property 'compassOptions' of undefined
    TypeError: Cannot read property 'compassOptions' of undefined
    Refer: https://github.com/quaertym/ember-cli-compass-compiler
   */
  included: function(app) {
    this._super.included(app);

    // OPTIONAL: import your addon dependencies from bower_components
    // app.import(`${app.bowerDirectory}/bootstrap/dist/js/bootstrap.js`);
    
    // Manually importing the hammer and animation frame dependencies used by ember-gestures
    app.import('node_modules/hammerjs/hammer.js');
    // app.import('vendor/AnimationFrame.js');
  }
};
