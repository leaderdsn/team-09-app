class RadiusEntity {
  constructor(factor = 25, value = 10) {
    this._factor = factor
    this._value = value
  }

  get factor() {
    return this._factor
  }

  set factor(value) {
    this._factor = value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }
}

module.exports = RadiusEntity;
