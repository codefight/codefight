var Player = require('./player');
var World = require('./world');
var Unit = require('./unit');
var Dummy = require('./ai/dummy');

var ChassisType = require('../models/chassis_type');
var ComponentType = require('../models/component_type');

module.exports = Match;

function Match(players, world) {
  var i, n;

  this.units = [];
  this.round = 0;

  // Create the players
  this.players = [];
  for (i = 0, n = players.length; i < n; i++) {
    var player = new Player(this, players[i], new Dummy());
    this.players.push(player);
  }

  this.world = world;

  // Create units
  for (i = 0, n = world.symbols.length; i < n; i++) {
    var unit;
    var symbol = world.symbols[i];
    switch (symbol.type) {
      case World.Symbol.HQ:
        unit = new Unit(this, this.players[symbol.team], ChassisType.BUILDING);
        unit.mount(ComponentType.BUILDER);
        unit.mount(ComponentType.RADAR);
        break;

      case World.Symbol.RECYCLER:
        unit = new Unit(this, this.players[symbol.team], ChassisType.LIGHT);
        unit.mount(ComponentType.RECYCLER);
        unit.mount(ComponentType.SIGHT);
        break;
    }

    if (unit) {
      this.units.push(unit);
    }
  }
}

Match.prototype = {
  update: function() {
    // Update units
    for (var i = 0, n = this.units.length; i < n; i++) {
      this.units[i].update();
    }

    // Increment round
    this.round++;
  }
};
