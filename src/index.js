const express = require('express');
const config = require('./config');
const { AppError } = require('./shared');
const { ProductRepositoryImpl, ProductController } = require('./infrastructure');
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

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'unknown',
  };

  try {
    if (productRepository.pool) {
      await productRepository.pool.query('SELECT 1');
      health.database = 'connected';
    }
  } catch {
    health.database = 'disconnected';
  }

  res.json(health);
});

const useDatabase = process.env.USE_DATABASE === 'postgres';

let productRepository;
if (useDatabase) {
  console.log('Using PostgreSQL database...');
  productRepository = new ProductRepositoryPostgresImpl(config.database);
} else {
  console.log('Using in-memory storage...');
  productRepository = new ProductRepositoryImpl();
}

const useCases = {
  createProduct: new CreateProduct(productRepository),
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
  console.log(`Database: ${useDatabase ? 'PostgreSQL' : 'In-Memory'}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close();
  if (productRepository.close) {
    await productRepository.close();
  }
  process.exit(0);
});

module.exports = app;
