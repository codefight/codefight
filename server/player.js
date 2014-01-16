module.exports = Player;

function Player(game, name) {
  this.game = game;
  this.name = name;
  this.money = 0;
}

Player.prototype = {
  command: function(command) {
    this.game.command(this, command);
  }
};
