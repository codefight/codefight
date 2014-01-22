var ChassisType = require('./chassis_type');
var ComponentType = require('./component_type');

module.exports = {
  HQ: {
    cost: 0,
    chassis: [ChassisType.LIGHT, ChassisType.BUILDING],
    components: [
      ComponentType.RECYCLER,
      ComponentType.BLADE,
      ComponentType.BLASTER,
      ComponentType.SIGHT
    ]
  },
  ARMORY: {
    cost: 70,
    chassis: [ChassisType.MEDIUM],
    components: [
      ComponentType.SMG,
      ComponentType.SNIPER,
      ComponentType.MEDIC,
      ComponentType.RADAR
    ]
  },
  FACTORY: {
    cost: 140,
    chassis: [ChassisType.HEAVY],
    components: [
      ComponentType.TRANSPORT,
      ComponentType.SHIELD,
      ComponentType.PLATING,
      ComponentType.HARDENED,
      ComponentType.REGEN,
      ComponentType.CANNON
    ]
  },
  TECH_LAB: {
    cost: 200,
    chassis: [ChassisType.FLYING],
    components: [
      ComponentType.JUMPER,
      ComponentType.SATELLITE,
      ComponentType.RAILGUN,
      ComponentType.PLASMA
    ]
  }
};
