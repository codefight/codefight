module.exports = Unit;

function Unit(game, owner, chassis, components) {
  this.game = game;
  this.owner = owner;
  this.chassis = chassis;
  this.components = components;
}

Unit.prototype = {
  update: function() {
    for (var i = 0, n = components.length; i < n; i++) {
      this.components[i].update();
    }
  }
};
