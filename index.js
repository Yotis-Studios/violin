const getPort = require('get-port');
const shocknet = require('shocknet');
const server = new shocknet.Server;

const Game = require('./src/game');
const ConnectionManager = require('./src/connectionManager');
const PacketHandler = require('./src/packetHandler')

const game = new Game(server);
const connectionManager = new ConnectionManager(server, game);
const packetHandler = new PacketHandler(connectionManager);

// Server logic
server.on('ready', () => {
	// Reports server port to Master Server
	console.log(server.port);
});
server.on('packet', (connection, packet) => {
	packetHandler.handleIncomingPacket(connection, packet);
});
server.on('connect', (connection) => {
	if (game.lobbyPassword == "") {
		if (!game.gameStarted) connectionManager.addConnection(connection);
	} else {
		connectionManager.solicitLobbyPassword(connection);
	}
});
server.on('disconnect', (connection) => {
	connectionManager.removeConnection(connection);
});

// Start
(async () => {
	server.listen(await getPort());
})();