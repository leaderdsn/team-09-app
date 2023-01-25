const Core = require('../Core/Core')

const EventBus = require('../Message/EventBus')
const EventMessage = require('../Message/EventMessage')

const collisionInteractionWithEntity = require('../Entity/Collisions.js')
const SocketMessageGenerator = require('../Generator/SocketMessageGenerator')
const StateManager = require('../State/StateManager')

class Game extends Core {

  constructor() {
    super()

    this._registerEvents();

    this.stateManager = new StateManager();
  }

  update() {
    EventBus.emit(EventMessage.GENERATE.FOOD)

    let entities = this.stateManager.getEntities()

    Object.values(entities).forEach(entity => {
      const touchEntities = collisionInteractionWithEntity(entity, Object.values(entities))

      Object.values(touchEntities).forEach(touchEntity => {
        EventBus.emit(EventMessage.TRIGGER.ENTER, entity, touchEntity)
      })
    })


    SocketMessageGenerator.creatingMessageTheFront(
      this.stateManager.getSockets(),
      this.stateManager.getEntities(),
    )
  }

  _addPlayer(socket, username) {
    console.log('Player join to game!', username, socket.id)

    this.stateManager.addPlayer(socket, username)
  }

  _addFood(food) {
    let allFoods = Object.values(this.stateManager.getEntities()).filter(food => food.type === 'food');

    if (allFoods.length < 20) {
      console.log('Food add to game!', food.id)
      this.stateManager.addEntity(food)
    }
  }

  _deadPlayer(code) {
    console.log('Player dead!', code)

    this.stateManager.deadPlayer(code)
  }

  _destroyerFood(code) {
    console.log('Food destroyer!', code)

    this.stateManager.destroyerEntity(code)
  }

  _disconnectedPlayer(socket) {
    console.log('Player disconnected!', socket.id)

    this.stateManager.disconnectedPlayer(socket)
  }

  _updatePlayerInput(socket, rotation) {
    this.stateManager.updatePlayerInput(socket, rotation)
  }

  _registerEvents() {
    EventBus.on(EventMessage.PLAYER.JOIN, this._addPlayer.bind(this))
    EventBus.on(EventMessage.PLAYER.DEAD, this._deadPlayer.bind(this))
    EventBus.on(EventMessage.PLAYER.INPUT, this._updatePlayerInput.bind(this))
    EventBus.on(EventMessage.PLAYER.DISCONNECT, this._disconnectedPlayer.bind(this))
    EventBus.on(EventMessage.FOOD.ADD, this._addFood.bind(this))
    EventBus.on(EventMessage.FOOD.DESTROY, this._destroyerFood.bind(this))
  }
}

module.exports = Game
