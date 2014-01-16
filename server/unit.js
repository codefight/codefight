var commands = require('./commands');

module.exports = Unit;

function Unit(owner, type) {
  this.owner = owner;
  this.type = type;
  this.pendingCommand = null;
}

Unit.prototype = {
  build: function(unitType) {
    this.pendingCommand = commands.move(this.unit, unitType);
  },
  move: function(direction) {
    this.pendingCommand = commands.move(this.unit, direction);
  },
  update: function() {
    if (this.pendingCommand) {
      this.world.command(this.owner, this.pendingCommand);
      this.pendingCommand = null;
    }
  }
};
