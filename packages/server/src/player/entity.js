class Entity {
  constructor(id, x, y, direction) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
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
