function Game(players, map) {
  var hqLocations;

  this.commands = [];
  this.units = [];

  // Create the map
  this.map = new Map(map);

  // Copy HQ locations
  hqLocations = map.hqLocations.slice();

  // Create the players
  this.players = [];
  for (var i = 0, n = players.length; i < n; i++) {
    var player = new Player(players[i]);
    this.players.push(player);

    // Pick random location
    var startingLocation = null;

    this._addUnit(player, startingLocation, UnitType.HQ);
  }
}

Game.prototype = {
  _addUnit: function(player, position, type) {
    this.units.push(new Unit(player, type));
  },
  update: function() {
    var i, n;

    // Update units
    for (i = 0, n = this.units.length; i < n; i++) {
      this.units[i].update();
    }

    // Process commands
    for (i = 0, n = this.commands.length; i < n; i++) {
      this.commands[i].call();
    }

    this.commands.length = 0;
  }
}
