class InMemoryRepository {
  constructor() {
    this.data = new Map();
  }

  async findById(id) {
    return this.data.get(id) || null;
  }

  async findAll() {
    return Array.from(this.data.values());
  }

  async save(entity) {
    this.data.set(entity.id, entity);
    return entity;
  }

  async delete(id) {
    this.data.delete(id);
  }
}

module.exports = InMemoryRepository;
