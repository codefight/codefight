var Player = require('./player');
var World = require('./world');

module.exports = Game;

function Game(players, map) {
  this.units = [];

  // Create the world
  this.world = new World(map);

  // Create the players
  this.players = [];
  for (var i = 0, n = players.length; i < n; i++) {
    var player = new Player(this, players[i]);
    this.players.push(player);
  }
}

Game.prototype = {
  update: function() {
    var i, n;

    // Update units
    for (i = 0, n = this.units.length; i < n; i++) {
      this.units[i].update();
    }
  }
};
