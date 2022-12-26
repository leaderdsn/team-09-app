class SpeedEntity {
  constructor(min = 50, max = 250, value = 0) {
    this._min = min
    this._max = max
    this._value = value
  }

  get min() {
    return this._min
  }

  set min(value) {
    this._min = value
  }

  get max() {
    return this._max
  }

  set max(value) {
    this._max = value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }
}

module.exports = SpeedEntity;
