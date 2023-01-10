const Entity = require('../Entity')

const RadiusEntity = require('../Properties/RadiusEntity')
const MassEntity = require('../Properties/MassEntity')

const EventBus = require('../../Message/EventBus')
const EventMessage = require('../../Message/EventMessage')

class Food extends Entity {
  constructor(x, y, code, color) {
    super(code, x, y)

    this.type = 'food';

    this.radius = new RadiusEntity(25, 10)
    this.mass = new MassEntity(0.25, 2, 0.0005, Math.floor(Math.random() * (2 - 0.25 + 1) + 0.25))
    this.color = color
  }

  update() {
    this.mass.value += this.deltaTime * this.mass.value * this.mass.factor;
    this.radius.value = this.mass.value * this.radius.factor;
  }

  onTriggerEnter(entity) {
    if (this.mass.value > entity.mass.value) {
      this.addMass(entity)
      entity.removeMass(this)
    }

    if (this.mass.value <= this.mass.min) {
      EventBus.emit(EventMessage.FOOD.DESTROY, this.id)
    }
  }

  addMass(entity) {
    if (this.mass.value >= this.mass.max) {
      this.mass.value = this.mass.max
      return
    }

    this.mass.value += this.deltaTime * entity.mass.value / 2
  }

  removeMass(entity) {
    this.mass.value -= this.deltaTime * entity.mass.value / 2
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      radius: this.radius.value,
      mass: this.mass.value,
      color: this.color
    }
  }
}

module.exports = Food
