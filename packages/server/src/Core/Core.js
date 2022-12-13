class Core {

  frameBySecond = 60
  frameTime = 1000
  deltaTime = 0
  lastUpdateTime = Date.now()

  constructor() {
    setInterval(this._lifeCycleSimulated.bind(this), this.frameTime / this.frameBySecond)
  }

  start() {}

  // Обновление вызывается фиксированное кол-во раз за кадр.
  fixedUpdate() {}

  // Вызывается один раз за кадр.
  update() {}

  _fixedUpdate() {
    this.fixedUpdate()
  }

  _update() {
    this.update()

    const now = Date.now()

    let deltaTime = Math.abs(this.lastUpdateTime - now) / this.frameTime;

    if (deltaTime > 0) {
      this.deltaTime = deltaTime
    }

    this.lastUpdateTime = now
  }

  _lifeCycleSimulated() {
    this._update()

    for (let i = 1; i <= this.frameBySecond; i++) {
      this._fixedUpdate()
    }
  }
}

module.exports = Core
