const settings = require('../config/state')
const Entity = require('./entity')
const Color = require('../game/color')

class Player extends Entity {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI)

    const color = new Color();

    this.username = username
    this.radius = settings.PLAYER_RADIUS
    this.mass = this.radius * settings.PLAYER_FACTOR_MASS * 100
    this.speed = settings.PLAYER_MAX_SPEED
    this.score = 0
    this.color = color.getRandomColor()
  }

  update(dt) {
    this.x += dt * this.speed * Math.sin(this.direction)
    this.y -= dt * this.speed * Math.cos(this.direction)

    this.score += dt * settings.SCORE_PER_SECOND

    if (this.mass <= settings.PLAYER_MAX_MASS) {
      this.mass += dt * settings.PLAYER_FACTOR_MASS
    }

    this.radius = this.mass * settings.PLAYER_RADIUS_FACTOR

    const speed = settings.PLAYER_MAX_SPEED - this.mass * 10;

    if (speed > settings.PLAYER_MIN_SPEED) {
      this.speed = speed
    }

    this.x = Math.max(0, Math.min(settings.MAP_SIZE, this.x))
    this.y = Math.max(0, Math.min(settings.MAP_SIZE, this.y))
  }

  addScore(touchEntity) {
    this.score += touchEntity.score || 1;
  }

  addMass(dt, touchEntity) {
    if (this.mass >= settings.PLAYER_MAX_MASS) {
      return;
    }

    this.mass += dt * touchEntity.mass * 25 / 35;
  }

  removeMass(dt, entity) {
    this.mass -= dt * entity.mass * 0.15
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      radius: this.radius,
      mass: this.mass,
      color: this.color
    }
  }
}

module.exports = Player
