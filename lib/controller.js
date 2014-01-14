module.exports = UnitController;

function UnitController(world, robot) {
  this.world = world;
  this.robot = robot;
  this.queue = [];
}

UnitController.prototype.act = function(action, params) {
  this.queue.push({
    'action': action,
    'params': params
  });
};

UnitController.prototype.canMove = function(direction) {
  return this.world.canMove(this.robot.position.add(direction));
};

UnitController.prototype.move = function(direction) {
  this.act('move', [direction]);
};
