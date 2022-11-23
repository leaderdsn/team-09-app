const Entity = require('./entity')
const settings = require('../config/state')

class Food extends Entity {
  constructor(code, x, y, value) {
    super(code, x, y, 0)

    this.mass = value
    this.radius = value * settings.PLAYER_RADIUS_FACTOR
    this.color = '#009999'
  }

  update() {
    this.radius = this.mass * settings.PLAYER_RADIUS_FACTOR

    this.x = Math.max(0, Math.min(settings.MAP_SIZE, this.x))
    this.y = Math.max(0, Math.min(settings.MAP_SIZE, this.y))
  }

  addMass(dt, touchEntity) {
    if (this.mass >= settings.PLAYER_MAX_MASS - 1) {
      return;
    }

    this.mass += dt * touchEntity.mass * 25 / 35;
  }

  removeMass(dt, entity) {
    this.mass -= dt * entity.mass * 0.75
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      radius: this.radius,
      mass: this.mass,
      color: this.color
    }
  }
}

module.exports = Food
