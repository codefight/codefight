module.exports = UnitController;

function UnitController(world, unit) {
  this.world = world;
  this.unit = unit;
}

UnitController.prototype.attack = function(target) {
  this.world.order(this.unit, {type: 'attack', target: target});
};

UnitController.prototype.move = function(direction) {
  this.world.order(this.unit, {type: 'move', direction: direction});
};

UnitController.prototype.senseNearbyUnits = function() {
  return this.word.senseNearbyUnits(this.unit);
};
