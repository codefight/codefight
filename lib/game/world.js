var fs = require('fs');

function load(file) {
  var content = fs.readFileSync(file);
  var data = JSON.parse(content);

  return parse(data);
}

function parse(data) {
  var symbols = [];
  var tiles = data.tiles
    .map(function(tiles) { return tiles.split(''); })
    .reduce(function(a, b) { return a.concat(b); })
    .map(function(tile, i) {
      var symbol;
      switch (tile) {
        // World tiles
        case '.': return Tile.SAND;
        case '#': return Tile.WALL;
        case '@': return Tile.MINE;

        // Symbols
        case 'h':
        case 'H':
          symbol = Symbol.HQ;
          break;

        case 'r':
        case 'R':
          symbol = Symbol.RECYCLER;
          break;
      }

      if (symbol) {
        symbols.push({
          x: i % data.width,
          y: i / data.width | 0,
          team: tile.toUpperCase() !== tile ? Team.A : Team.B,
          type: symbol
        });
      }

      // Default tile
      return Tile.SAND;
    });

  return new World(data.width, data.height, tiles, symbols);
}

var Team = {
  A: 0,
  B: 1
};

var Symbol = {
  HQ: 1,
  RECYCLER: 2
};

var Tile = {
  SAND: 1,
  WALL: 2,
  MINE: 3
};

function World(width, height, tiles, symbols) {
  this.width = width;
  this.height = height;
  this.tiles = tiles;
  this.symbols = symbols;
}

World.prototype = {
  contains: function(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  },
  get: function(x, y) {
    return this.contains(x, y) ? this.tiles[y * this.width + x] : undefined;
  }
};

exports.load = load;
exports.parse = parse;
exports.Symbol = Symbol;
exports.Team = Team;
exports.Tile = Tile;
exports.World = World;
