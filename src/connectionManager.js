
class ConnectionManager {
    constructor(server, game) {
        this.connections = {};
        this.heartbeat = {};
        this.server = server;
        this.game = game;

        // Destroy this server if noone connects within 60 seconds
        setTimeout(() => {
            if (this.connections[0] === undefined) this.killServer(1);
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
        let connID = undefined;
        // Assign lowest available connection ID
        for (let i = 0; connID === undefined; i++) {
            if (this.connections[i] === undefined) {
            connID = i;
            }
        }
        this.connections[connID] = connection;
        // Start heartbeat timer
        this.heartbeat[connID] = Date.now();
        // Add player to game
        this.game.addPlayer(connID);
    }
    removeConnection(connection) {
        const id = this.getIDFromConnection(connection);
        if (id === undefined) return;
        delete this.connections[id];
        delete this.heartbeat[id];
        this.game.removePlayer(id);
        connection.kick();
        console.log(`Closed connection ${id}`);
    }
    swapConnections(i, j) {
        const temp = this.connections[i];
        this.connections[i] = this.connections[j];
        this.connections[j] = temp;
    }
    getIDFromConnection(connection) {
        if (connection === undefined) return undefined;
        for (let i in this.connections) {
            if (this.connections[i] === connection) return i;
        }
        return undefined;
    }
    killServer(code) {
        this.server.close();
        process.exit(code); 
    }
    updateHeartbeat(id) {
        this.heartbeat[id] = Date.now();
    }
}

module.exports = ConnectionManager;