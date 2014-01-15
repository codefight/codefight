function World() {
  this.orders = new Map();
  this.units = [];
  this.nextId = 0;

  function createPlayer(name) {
    const player = new Player(this, name);
    const hq = createUnit(UnitType.HQ);
  }
}

World.prototype.update = function() {
  for (var i = 0, n = this.units.length; i < n; i++) {
    this.units[i].update();
  }
};

World.prototype.unit = function(type) {
  var unit = Object.create(Unit);

  unit.id = this.nextId++;
  unit.type = UnitType[type];
};

World.prototype.order = function(unit, order) {
  this.orders.set(unit.id, order);
};

World.prototype.senseNearbyUnits = function(unit) {
  return this.units.filter(function(u) {
    return u.position.distance(unit.position) <= unit.type.sensorRadius;
  });
};
