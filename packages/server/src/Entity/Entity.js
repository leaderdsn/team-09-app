const Core = require('../Core/Core')
const Transform = require('./Properties/Transform')

const EventBus = require('../Message/EventBus')
const EventMessage = require('../Message/EventMessage')

class Entity extends Core {
  frameBySecond = 1

  constructor(id, x, y) {
    super();

    this._registerEvents();

    this.id = id;
    this.type = 'entity';
    this.transform = new Transform(x, y, Math.random() * 2 * Math.PI);
  }

  distanceTo(object) {
    const directionX = this.transform.x - object.transform.x;
    const directionY = this.transform.y - object.transform.y;

    return Math.sqrt(directionX * directionX + directionY * directionY);
  }

  setDirection(rotation) {
    this.transform.rotation = rotation;
  }

  onTriggerEnter(entity) {}

  _onTriggerEnter(mainEntity, otherEntity) {
    if (this.id !== mainEntity.id) {
      return;
    }

    this.onTriggerEnter(otherEntity);
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.transform.x,
      y: this.transform.y,
      rotation: this.transform.rotation,
    };
  }

  _registerEvents() {
    EventBus.on(EventMessage.ENTITY.UPDATE, this._update.bind(this))
    EventBus.on(EventMessage.ENTITY.FIXED_UPDATE, this._fixedUpdate.bind(this))
    EventBus.on(EventMessage.TRIGGER.ENTER, this._onTriggerEnter.bind(this))
  }
}

module.exports = Entity;
