function Game(players, map) {
  var hqLocations;

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
    this._addUnit(player, startingLocation, UnitType.BUILDER);
  }
}

Game.prototype = {
  update: function() {
    var i, n;

    // Process commands
    for (i = 0, n = this.commands.length; i < n; i++) {
      this.commands[i].execute();
    }

    this.commands.length = 0;
  }
}
