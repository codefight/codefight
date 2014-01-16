module.exports = function(unit, position, unitType) {
  return function(game) {
    var player = unit.owner;
    if (player.money <= unitType.cost && word.isFree(position)) {
      player.money -= unitType.cost;
      game.createUnit(player, position, unitType);
    }
  };
};
