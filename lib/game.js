function Game() {
  this.round = -1;

  this.units = [];
  this.unitsById = new Map();
  this.unitsByPosition = new Map();
}

Game.prototype.createUnit = function() {
  var unit = {
    id: 0,
    position: 0
  };

  return unit;
};

Game.prototype.update = function() {
  this.round++;

  for (var i = 0, n = this.units.length; i < n; i++) {
    this.units[i].run();
  }
};

Game.prototype.onUnitAdded = function(unit) {
  if (this.unitsById.has(unit.id)) {
    return;
  }

  this.units.push(unit);
  this.unitsById.add(unit.id, unit);
  this.unitsByPosition.add(unit.position, unit);
};

Game.prototype.onUnitMoved = function(unit) {
  this.unitsByPosition.delete(unit.position);
  this.unitsByPosition.add(unit.position, unit);
};

Game.prototype.onUnitRemoved = function(unit) {
  if (!this.unitsById.has(unit.id)) {
    return;
  }

  this.units.splice(this.units.indexOf(unit), 1);
  this.unitsById.delete(unit.id, unit);
  this.unitsByPosition.delete(unit.position, unit);
};
