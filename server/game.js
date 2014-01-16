var Player = require('./player');
var World = require('./world');

function Game(players, map) {
  this.commands = [];

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
  command: function(player, command) {
    this.commands.push({
      player: player,
      execute: command
    });
  },
  update: function() {
    var i, n;

    // Update units
    for (i = 0, n = this.units.length; i < n; i++) {
      this.units[i].update();
    }

    // Process commands
    for (i = 0, n = this.commands.length; i < n; i++) {
      this.commands[i].execute(this);
    }

    this.commands.length = 0;
  }
};
