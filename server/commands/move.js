var vec2 = require('gl-matrix').vec2;

module.exports = function(unit, direction) {
  return function(game) {
    var position = vec2.add(unit.position, direction);
    if (world.map.isTraversable(position)) {
      unit.position = position;
    }
  };
};
