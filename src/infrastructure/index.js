const HttpController = require('./adapters/http/HttpController');
const ProductController = require('./adapters/http/ProductController');
const PersistenceAdapter = require('./adapters/persistence/PersistenceAdapter');
const InMemoryRepository = require('./repositories/InMemoryRepository');
const ProductRepositoryImpl = require('./repositories/ProductRepositoryImpl');
const ProductRepositoryPostgresImpl = require('./repositories/ProductRepositoryPostgresImpl');

module.exports = {
  HttpController,
  ProductController,
  PersistenceAdapter,
  InMemoryRepository,
  ProductRepositoryImpl,
  ProductRepositoryPostgresImpl,
};
