var types = module.exports = {
  // Miscellaneous
  BUILDER:   {cost: 40, slots: 4},
  JUMPER:    {cost: 40, slots: 4},
  RECYCLER:  {cost: 70, slots: 4},
  TRANSPORT: {cost: 50, slots: 4},

  // Armors
  SHIELD:   {cost: 10, slots: 1, power: 10},
  PLATING:  {cost: 10, slots: 1, power: 10},
  HARDENED: {cost: 10, slots: 2, power: 10},
  REGEN:    {cost: 10, slots: 2, power: 10},
  PLASMA:   {cost: 10, slots: 2, power: 0},

  // Weapons
  BLADE:   {cost: 10, slots: 2, delay: 1, range: 4,  damage: 10},
  BLASTER: {cost: 10, slots: 1, delay: 1, range: 10, damage: 10},
  SMG:     {cost: 10, slots: 2, delay: 1, range: 10, damage: 10},
  SNIPER:  {cost: 10, slots: 2, delay: 1, range: 10, damage: 10},
  CANNON:  {cost: 10, slots: 5, delay: 1, range: 10, damage: 10},
  RAILGUN: {cost: 10, slots: 5, delay: 1, range: 10, damage: 10},
  MEDIC:   {cost: 10, slots: 4, delay: 1, range: 10, damage: -10},

  // Sensors
  SIGHT:     {cost: 5,  slots: 1, range: 9},
  RADAR:     {cost: 15, slots: 2, range: 49},
  SATELLITE: {cost: 25, slots: 3, range: 81},

  // Motors
  SLOW_MOTOR:   {cost: 0, slots: 0, delay: 8},
  MEDIUM_MOTOR: {cost: 0, slots: 0, delay: 5},
  FAST_MOTOR:   {cost: 0, slots: 0, delay: 3}
};

var requiredFields = {
  cost:  0,
  slots: 0,
  delay: 0,
  range: 0
};

for (var comp in types) {
  comp = types[comp];

  for (var field in requiredFields) {
    if (typeof comp[field] === 'undefined') {
      comp[field] = requiredFields[field];
    }
  }
}
