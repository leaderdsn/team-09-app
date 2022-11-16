const Entity = require('./entity');
const settings = require('../config/state');

class Player extends Entity {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, settings.PLAYER_MAX_SPEED);
    this.username = username;
    this.hp = settings.PLAYER_MAX_HP;
    this.mass = settings.PLAYER_MASS;
    this.color = this.getRandomColor();
    this.score = 0;
  }

  // Обновление состояния player
  update(dt) {
    super.update(dt);

    this.score += dt * settings.SCORE_PER_SECOND;
    this.mass += dt * settings.MASS_PER_SECOND;

    let speed = this.speed - ((this.mass / 2) * 0.005);

    if (speed > settings.PLAYER_MIN_SPEED) {
      this.speed = speed;
    }

    this.x = Math.max(0, Math.min(settings.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(settings.MAP_SIZE, this.y));

    return null;
  }

  addScore(otherPlayer) {
    this.score += otherPlayer.mass;
  }

  addMass(otherPlayer) {
    let calculateMass = (otherPlayer.mass * 25) / 100;
    this.mass += calculateMass;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      username: this.username,
      hp: this.hp,
      mass: this.mass,
      color: this.color,
    };
  }
}

module.exports = Player;
