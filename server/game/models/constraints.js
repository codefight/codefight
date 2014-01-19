module.exports = {
  canMount: function(unit, componentType) {
    var chassis = unit.chassis;
    if (chassis === ChassisType.BUILDING) {
      // Disallow motor components on buildings
      if (componentType.categoy === ComponentClass.MOTOR) {
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
  }
};
