/* eslint-env node */
module.exports = {
  description: '',

  locals(options) {
    // Return custom template variables here.
    let params = options.taskOptions || options.entity.options;
    this.ui.writeLine(JSON.stringify(options.entity));
    return {
      classList: params.classList || 'ember-slider',
      pathColor: params.classes || '#ccc',
      handleColor: params.handleColor || '#eee',
      fillerColor: params.fillerColor || '#aaa'
    };
  },
  fileMapTokens: function(options) {
    // Return custom tokens to be replaced in your files
    return {
      __styleToken__: function(options) {
        console.log(options.dasherizedModuleName);
        return "_" + options.dasherizedModuleName;
      }
    }
  },

  afterInstall(options) {
    //for(var i in options)
      //sthis.ui.writeLine(i + JSON.stringify(options[i]));
    this.ui.writeLine("Custom .scss file generated successfully. \nImport it in your app's main scss file to use it.");
  }
};