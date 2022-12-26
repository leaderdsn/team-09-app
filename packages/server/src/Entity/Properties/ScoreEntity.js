class ScoreEntity {
  constructor(perSecond = 0.25, factor = 0.25, value = 0) {
    this._perSecond = perSecond
    this._factor = factor
    this._value = value
  }

  get perSecond() {
    return this._perSecond
  }

  set perSecond(value) {
    this._perSecond = value
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

module.exports = ScoreEntity;
