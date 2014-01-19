var Component = require('./component');

module.exports = Component.inherits({
  attack: function(position) {
    this.assertInactive();
  }
});
