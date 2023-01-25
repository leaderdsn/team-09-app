class MassEntity {
  constructor(min = 0.2, max = 13, factor = 0.0005, value = 0) {
    this._min = min
    this._max = max
    this._factor = factor
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

module.exports = MassEntity;
