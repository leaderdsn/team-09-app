const settings = require('../../config/settings')
const Player = require('../Entity/Variation/Player')
const Food = require('../Entity/Variation/Food')
const Color = require('./ColorGenerator')
const { v4: uuidv4 } = require('uuid')

const EventBus = require('../Message/EventBus')
const EventMessage = require('../Message/EventMessage')

class EntityGenerator {

  constructor() {
    this._registerEvents();
  }

  createPlayer(code, name) {

    const color = new Color();
    const x = settings.MAP_SIZE * (0.25 + Math.random() * 0.75)
    const y = settings.MAP_SIZE * (0.25 + Math.random() * 0.75)

    return new Player(x, y, code, name, color.createRandomColor())
  }

  _generateFoods() {
    const x = settings.MAP_SIZE * (0.05 + Math.random() * 0.85)
    const y = settings.MAP_SIZE * (0.05 + Math.random() * 0.85)

    let food = new Food(x, y,  uuidv4(), 'red');

    EventBus.emit(EventMessage.FOOD.ADD, food)
  }

  _registerEvents() {
    EventBus.on(EventMessage.GENERATE.FOOD, this._generateFoods.bind(this))
  }
}

module.exports = EntityGenerator
