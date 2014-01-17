var util = require('util');

module.exports = Component;

function Component(unit, type) {
  this.unit = unit;
  this.type = type;
  this.cooldown = 0;
}

Component.inherits = function(proto) {
  delete proto.constructor;

  var ctor = function(unit, type) {
    Component.call(this, unit, type);
  }

  util.inherits(ctor, Component);

  for (var prop in proto) {
    if (proto.hasOwnProperty(prop) && typeof proto[prop] === 'function') {
      ctor.prototype[prop] = proto[prop];
    }
  }

  return ctor;
};

Component.prototype = {
  get game() {
    return this.unit.game;
  },
  activate: function() {
    if (this.cooldown < this.type.delay) {
      this.cooldown = this.type.delay;
    }
  },
  update: function() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }
};
