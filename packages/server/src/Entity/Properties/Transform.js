const Vector2 = require('./Vector2')

class Transform {
  constructor(x, y, rotation) {
    this._position = new Vector2(x, y)
    this._rotation = rotation
  }

  get x() {
    return this._position.x
  }

  set x(x) {
    this._position.x = x
  }

  get y() {
    return this._position.y
  }

  set y(y) {
    this._position.y = y;
  }

  get rotation() {
    return this._rotation
  }

  set rotation(value) {
    this._rotation = value
  }
}

module.exports = Transform;