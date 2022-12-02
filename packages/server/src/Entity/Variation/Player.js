const settings = require('../../../config/settings')
const Entity = require('../Entity')

const RadiusEntity = require('../Properties/RadiusEntity')
const SpeedEntity = require('../Properties/SpeedEntity')
const MassEntity = require('../Properties/MassEntity')
const ScoreEntity = require('../Properties/ScoreEntity')

const EventBus = require('../../Message/EventBus')
const EventMessage = require('../../Message/EventMessage')

class Player extends Entity {
  constructor(x, y, code, name, color) {
    super(code, x, y)

    this.type = 'player';

    this.radius = new RadiusEntity(25, 10)
    this.mass = new MassEntity(0.2, 13, 0.0005, 0.5)
    this.speed = new SpeedEntity(50, 150, 0)
    this.score = new ScoreEntity(0.25, 0.25, 0)

    this.name = name
    this.color = color
  }

  update() {
    this.transform.x += this.deltaTime * this.speed.value * Math.sin(this.transform.rotation)
    this.transform.y -= this.deltaTime * this.speed.value * Math.cos(this.transform.rotation)

    this.mass.value += this.deltaTime * this.mass.value * this.mass.factor;

    this.radius.value = this.mass.value * this.radius.factor;

    const speed = this.speed.max - this.mass.value * 10

    if (speed > this.speed.min) {
      this.speed.value = speed
    }

    this.transform.x = Math.max(0, Math.min(settings.MAP_SIZE, this.transform.x))
    this.transform.y = Math.max(0, Math.min(settings.MAP_SIZE, this.transform.y))
  }

  onTriggerEnter(entity) {
    if (this.mass.value > entity.mass.value) {
      this.addMass(entity)
      entity.removeMass(this)
    }

    if (this.mass.value <= this.mass.min) {
      EventBus.emit(EventMessage.PLAYER.DEAD, this.id)
    }
  }

  addScore(touchEntity) {
    this.score.value += touchEntity.score.value || 1
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
      name: this.name,
      radius: this.radius.value,
      mass: this.mass.value,
      color: this.color
    }
  }
}

module.exports = Player
