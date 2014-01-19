var ChassisType = require('../models/chassis_type');
var ComponentType = require('../models/component_type');
var Component = require('./component');

module.exports = Component.inherits({
  canMount: function(unit, componentType) {
    var chassis = unit.chassis;
    if (chassis === ChassisType.BUILDING) {
      // Disallow motor components on buildings
      if (componentType === ComponentType.SLOW_MOTOR ||
          componentType === ComponentType.MEDIUM_MOTOR ||
          componentType === ComponentType.FAST_MOTOR) {
        return false;
      }

      // Disallow jumper component on buildings
      if (componentType === ComponentType.JUMPER) {
        return false;
      }
    } else {
      // Disallow recycler component on movable units
      if (componentType === ComponentType.RECYCLER) {
        return false;
      }
    }

    return true;
  },
  mount: function(componentType) {
    this.assertInactive();
    if (!this.owner.hasTechnology(componentType)) {
      throw "Cannot mount this component on that chassis.";
    }

    if (!this.canMount(this, componentType)) {
      throw "Cannot mount this component on that chassis.";
    }

    this.unit.mount(componentType);
  },
  unmount: function(componentType) {
    this.unit.unmount(componentType);
  }
});
