var fs = require('fs');

module.exports = World;

function World(width, height) {
  this.width = width;
  this.height = height;
  this.map = new Array(width * height);
}

World.fromJSON = function(map) {

};

World.prototype = {
  contains: function(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  },
  get: function(x, y) {
    return this.contains(x, y) ? this.map[y * this.height + x] : undefined;
  }
};
