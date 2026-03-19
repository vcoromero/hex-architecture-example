const HttpController = require('./adapters/http/HttpController');
const ProductController = require('./adapters/http/ProductController');
const PersistenceAdapter = require('./adapters/persistence/PersistenceAdapter');
const InMemoryRepository = require('./repositories/InMemoryRepository');
const ProductRepositoryImpl = require('./repositories/ProductRepositoryImpl');

module.exports = {
  HttpController,
  ProductController,
  PersistenceAdapter,
  InMemoryRepository,
  ProductRepositoryImpl,
};
