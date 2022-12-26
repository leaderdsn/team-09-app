const state = require('./State');
const EventMessage = require('../Message/EventMessage')

const EntityGenerator = require('../Generator/EntityGenerator')

class StateManager {
  addPlayer(socket, username) {
    state.add('sockets', socket)

    let entityGenerator = new EntityGenerator();

    let player = entityGenerator.createPlayer(socket.id, username)

    state.add('entities', player)
  }

  addEntity(entity) {
    state.add('entities', entity)
  }

  updatePlayerInput(socket, rotation) {
    let player = this.getEntity(socket.id);

    if (player === undefined || player === null) {
      return;
    }

    player.setDirection(rotation)

    this.updateEntity(player)
  }

  deadPlayer(code) {
    let socket = this.getSocket(code)

    if (socket === undefined) {
      return;
    }

    this.disconnectedPlayer(socket);

    socket.emit(EventMessage.SOCKET.GAME_OVER);
  }

  destroyerEntity(code) {
    state.remove('entities', code);
  }

  disconnectedPlayer(socket) {
    state.remove('sockets', socket.id);
    state.remove('entities', socket.id);
  }

  getEntity(code) {
    return state.get('entities', code);
  }

  updateEntity(entity) {
    state.update('entities', entity)
  }

  getSocket(code) {
    return state.get('sockets', code);
  }

  getEntities() {
    return state.getAllByType('entities');
  }

  getSockets() {
    return state.getAllByType('sockets');
  }

  getEntityList() {
    return state.getAll();
  }
}

module.exports = StateManager