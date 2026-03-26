const HttpController = require('./adapters/http/HttpController');
const ProductController = require('./adapters/http/ProductController');
const ProductRepositoryImpl = require('./repositories/ProductRepositoryImpl');
const ProductRepositoryPostgresImpl = require('./repositories/ProductRepositoryPostgresImpl');

module.exports = {
  HttpController,
  ProductController,
  ProductRepositoryImpl,
  ProductRepositoryPostgresImpl,
};
