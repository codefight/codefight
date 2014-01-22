var Constants = require('../models/constants');

module.exports = Player;

function Player(game, name, ai) {
  this.game = game;
  this.name = name;
  this.ai = ai;
  this.money = Constants.INITIAL_MONEY;
}

Player.prototype = {
  command: function(unit) {
    this.ai.run(unit);
  }
};
