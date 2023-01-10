class State {
  list = {}

  add(type, entity) {
    if (!this.list[type]) {
      this.list[type] = [];
    }

    this.list[type][entity.id] = entity
  }

  get(type, id) {
    if (!this.list[type]) {
      console.log(`Передаваемый тип сущности ${type} не существует.`)
      return null;
    }

    if (!this.list[type][id]) {
      console.log(`Сущности по передаваемому ID ${id} не существует.`)
      return null;
    }

    return this.list[type][id]
  }

  update(type, entity) {
    if (!this.list[type]) {
      console.log(`Передаваемый тип сущности ${type} не существует.`);
      return ;
    }

    if (!this.list[type][entity.id]) {
      console.log(`Данная сущность не существует.`);
      return;
    }

    this.list[type][entity.id] = entity;
  }

  getAll() {
    return this.list
  }

  getAllByType(type) {
    if (!this.list[type]) {
      return [];
    }

    return this.list[type]
  }

  remove(type, code) {
    if (!this.list[type]) {
      console.log(`Передаваемый тип сущности ${type} не существует.`);
      return;
    }

    if (!this.list[type][code]) {
      console.log(`Данная сущность ${code} для ${type} не существует.`);
      return;
    }

    delete this.list[type][code]
  }
}

module.exports = new State()
