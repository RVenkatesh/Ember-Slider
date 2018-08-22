/* eslint-env node */
module.exports = {
  description: '',

  locals(options) {
    // Return custom template variables here.
    let params = options.taskOptions || options.entity.options;
    return {
      classList: params.classList || 'ember-slider',
      pathColor: params.pathColor || '#ccc',
      handleColor: params.handleColor || '#eee',
      fillerColor: params.fillerColor || '#aaa',
      scale: params.scale || '1'

    };
  },

  afterInstall(options) {
    this.ui.writeLine("Custom "+options.entity.name+".scss file generated successfully. \nImport it in your app's main scss file to use it.");
  }
};