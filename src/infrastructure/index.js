const HttpController = require('./adapters/http/HttpController');
const ProductController = require('./adapters/http/ProductController');
const UuidAdapter = require('./adapters/id/UuidAdapter');
const ProductRepositoryPostgresImpl = require('./repositories/ProductRepositoryPostgresImpl');

module.exports = {
  HttpController,
  ProductController,
  UuidAdapter,
  ProductRepositoryPostgresImpl,
};
