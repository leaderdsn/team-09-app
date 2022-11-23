const Food = require('./food')
const settings = require('../config/state')

class Sourness extends Food {
  constructor(code, x, y, value) {
    super(code, x, y, value)

    this.mass = value
    this.radius = value * settings.PLAYER_RADIUS_FACTOR
    this.color = '#FF4040'
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

    this.mass += dt * touchEntity.mass * 0.25;
  }

  removeMass(dt, entity) {
    let average = this.mass + entity.mass / 2;
    this.mass -= dt * average;
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

module.exports = Sourness
