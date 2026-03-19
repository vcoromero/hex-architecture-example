const express = require('express');
const config = require('./config');
const { AppError } = require('./shared');
const { ProductRepositoryImpl, ProductController } = require('./infrastructure');
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

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const productRepository = new ProductRepositoryImpl();
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

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = app;
