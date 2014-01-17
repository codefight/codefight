var Component = require('./component');

module.exports = Component.inherits({
  build: function(position, chassisType, componentTypes) {
    this.assertInactive();
  }
});
