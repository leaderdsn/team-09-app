class Food {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  serializeForUpdate() {
    return {
      // ...(super.serializeForUpdate()),
      x: this.x,
      y: this.y,
      radius: this.radius,
      // color: this.color
    };
  }
}

module.exports = Food;
