const BaseRepository = require('./BaseRepository');

class ProductRepository extends BaseRepository {
  async findByName(name) {
    throw new Error('Method not implemented');
  }

  async exists(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = ProductRepository;
