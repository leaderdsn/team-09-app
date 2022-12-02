class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  up() {
    this.y += 1
  }

  down() {
    this.y -= 1
  }

  left() {
    this.x -= 1
  }

  right() {
    this.x += 1
  }

  zero() {
    this.x = 0
    this.y = 0
  }

  one() {
    this.x = 1
    this.y = 1
  }
}

module.exports = Vector2;