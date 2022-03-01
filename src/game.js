const Player = require('./player');

class Game {
    constructor(server) {
      this.server = server;
      this.players = {};
    }
    addPlayer(id) {
        this.players[id] = new Player(id);
    }
    removePlayer(id) {
        delete this.players[id];
    }
}
module.exports = Game;