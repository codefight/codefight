module.exports = function(world, unit, direction) {
  return function() {
    var position = vec2.add(unit.position, direction);
    if (world.map.isTraversable(position)) {
      unit.position = position;
    }
  };
};
