const id = require('./netID');

class PacketHandler {
    constructor(connectionManager) {
      this.connectionManager = connectionManager;
      this.server = connectionManager.server;
      this.game = connectionManager.game;
    }
    handleIncomingPacket(connection, packet) {
      const i = this.connectionManager.getIDfromConnection(connection);

      switch(packet.netId) {
          case id.HEARTBEAT: {
              this.connectionManager.updateHeartbeat(connection);
          } break;
      }
    }
}
module.exports = PacketHandler;