const express = require('express');
const config = require('./config');
const { AppError } = require('./shared');
const { ProductController, UuidAdapter } = require('./infrastructure');
const ProductRepositoryPostgresImpl = require('./infrastructure/repositories/ProductRepositoryPostgresImpl');
const {
  CreateProduct,
  GetProduct,
  SearchProducts,
  UpdateProduct,
  AdjustStock,
  DeleteProduct,
} = require('./application');

const app = express();

app.use(express.json());

const productRepository = new ProductRepositoryPostgresImpl(config.database);
const idGenerator = new UuidAdapter();

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'unknown',
  };

  try {
    await productRepository.pool.query('SELECT 1');
    health.database = 'connected';
  } catch {
    health.database = 'disconnected';
  }

  res.json(health);
});

const useCases = {
  createProduct: new CreateProduct(productRepository, idGenerator),
  getProduct: new GetProduct(productRepository),
  searchProducts: new SearchProducts(productRepository),
  updateProduct: new UpdateProduct(productRepository),
  adjustStock: new AdjustStock(productRepository),
  deleteProduct: new DeleteProduct(productRepository),
};

new ProductController(app, useCases);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  });
});

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close();
  await productRepository.close();
  process.exit(0);
});

module.exports = app;
