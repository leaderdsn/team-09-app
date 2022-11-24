const settings = require('../config/state')
const Entity = require('./entity')
const Color = require('../game/color')

function distance(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}

class Player extends Entity {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI)

    const color = new Color();

    this.username = username
    this.radius = settings.PLAYER_RADIUS
    this.mass = this.radius * settings.PLAYER_FACTOR_MASS * 100
    this.speed = settings.PLAYER_MAX_SPEED
    this.target = { x, y }
    this.score = 0
    this.color = color.getRandomColor()
  }

  update(dt) {
    if (this.target) {
      const targetDistance = distance(this.x, this.y, this.target.x, this.target.y)

      if (targetDistance < 1) {
        this.x = this.target.x
        this.y = this.target.y
      } else {
        this.x += dt * this.speed * Math.sin(this.direction)
        this.y -= dt * this.speed * Math.cos(this.direction)
      }
    } else {
      this.x += dt * this.speed * Math.sin(this.direction)
      this.y -= dt * this.speed * Math.cos(this.direction)
    }

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

    this.mass += dt * touchEntity.mass * 0.25;
  }

  removeMass(dt, entity) {
    let average = this.mass + entity.mass / 2;
    this.mass -= dt * average;
  }

  setTarget(target) {
    this.target = target;
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
