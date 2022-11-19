class Entity {
  constructor(id, x, y, direction, speed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
  }

  // Обновление координат (перемещение) от изменения direction
  update(dt) {
    this.x += dt * this.speed * Math.sin(this.direction);
    this.y -= dt * this.speed * Math.cos(this.direction);
  }

  // Получение дистанции до любого объекта
  distanceTo(object) {
    const directionX = this.x - object.x;
    const directionY = this.y - object.y;
    return Math.sqrt(directionX * directionX + directionY * directionY);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Entity;
