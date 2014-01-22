var Match = require('../lib/game/match');
var world = require('../lib/game/world');

var map = __dirname + '/../content/maps/simple.json';
var match = new Match(['A', 'B'], world.load(map));

while (match.round < 2000) {
  match.update();
}
