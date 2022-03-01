
class ConnectionManager {
    constructor(server, game) {
        this.connections = {};
        this.heartbeat = {};
        this.server = server;
        this.game = game;

        // Destroy this server if the host doesn't connect in 60 seconds
        setTimeout(() => {
            if (this.connections[this.game.host] === undefined) this.killServer(1);
        }, 60000);

        // Cull connections that fail heartbeat check every 60 seconds
        setInterval(() => {
            for (let i in this.connections) {
                if (this.heartbeat[i] !== undefined && this.heartbeat[i] < (Date.now() - 60000)) {
                    if (this.connections[i] !== undefined) {
                        this.removeConnection(this.connections[i]);
                    }
                }
            }
        }, 60000);
    }

    addConnection(connection) {
    }

    removeConnection(connection) {

    }
}

module.exports = ConnectionManager;