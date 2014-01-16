module.exports = Object.freeze({
  // Buildings
  HQ: Object.freeze({building: true, maxHealth: 1000, sensorRadius: 10, attackPower: 30}),
  // Ground units
  BUILDER: Object.freeze({building: false, maxHealth: 150, sensorRadius: 6, attackPower: 20}),
  SOLDIER: Object.freeze({building: false, maxHealth: 100, sensorRadius: 4, attackPower: 35})
});
