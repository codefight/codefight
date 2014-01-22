var components = require('./components');
var ComponentType = require('../models/component_type');

module.exports = Unit;

function Unit(game, owner, chassis) {
  this.game = game;
  this.owner = owner;
  this.chassis = chassis;
  this.components = [];
  this.slots = 0;
}

Unit.prototype = {
  mount: function(componentType) {
    var component;
    switch (componentType) {
      case ComponentType.BUILDER:
        component = new components.Builder(this, componentType);
        break;

      case ComponentType.RECYCLER:
        component = new components.Recycler(this, componentType);
        break;

      case ComponentType.BLADE:
      case ComponentType.BLASTER:
      case ComponentType.SMG:
      case ComponentType.SNIPER:
      case ComponentType.CANNON:
      case ComponentType.RAILGUN:
      case ComponentType.MEDIC:
        component = new components.Weapon(this, componentType);
        break;

      case ComponentType.SIGHT:
      case ComponentType.RADAR:
      case ComponentType.SATELLITE:
        component = new components.Sensor(this, componentType);
        break;

      default:
        throw "Unknown component.";
    }

    this.components.push(component);
    this.slots += componentType.slots;
  },
  unmount: function(component) {
    var i = this.components.indexOf(component);
    if (i >= 0) {
      this.components.splice(i, 1);
      this.slots -= component.type.slots;
    }
  },
  update: function() {
    // Run AI engine
    this.owner.command(this);

    // Update components
    for (var i = this.components.length; i--;) {
      this.components[i].update();
    }
  }
};
