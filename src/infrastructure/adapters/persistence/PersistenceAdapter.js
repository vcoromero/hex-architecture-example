const BaseRepository = require('../../../domain/repositories/BaseRepository');

class PersistenceAdapter extends BaseRepository {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async save(entity) {
    return this.repository.save(entity);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = PersistenceAdapter;
