const HttpController = require('./adapters/http/HttpController');
const PersistenceAdapter = require('./adapters/persistence/PersistenceAdapter');
const InMemoryRepository = require('./repositories/InMemoryRepository');

module.exports = {
  HttpController,
  PersistenceAdapter,
  InMemoryRepository,
};
