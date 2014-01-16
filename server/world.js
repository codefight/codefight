module.exports = World;

function World(width, height) {
  this.width = width;
  this.height = height;
  this.map = new Array(width * height);
}

World.prototype = {
  get: function(x, y) {
    return this.map[y * this.height + x];
  }
};
