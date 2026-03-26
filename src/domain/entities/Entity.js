class Entity {
  constructor(id) {
    if (id === undefined || id === null) {
      throw new Error('Entity must have an id');
    }
    this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  equals(entity) {
    if (!entity || !(entity instanceof Entity)) {
      return false;
    }
    return this.id === entity.id;
  }

  updateTimestamp() {
    this.updatedAt = new Date();
  }
}

module.exports = Entity;
