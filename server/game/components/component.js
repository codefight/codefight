var util = require('util');
var vec2 = require('vec2');

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
  };

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
  assertInactive: function() {
    if (this.cooldown > 0) {
      throw "This component is already active.";
    }
  },
  assertWithinRange: function(position) {
    if (!checkWithinRange(position)) {
      throw "This target is out of range.";
    }
  },
  checkWithinRange: function(position) {
    return vec2.distance(this.unit.position, position) <= this.type.range;
  },
  update: function() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }
};
