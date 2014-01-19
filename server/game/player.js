var Constants = require('models/constants');

module.exports = Player;

function Player(game, name) {
  this.game = game;
  this.name = name;
  this.money = Constants.INITIAL_MONEY;
}

Player.prototype = {
};
