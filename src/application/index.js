const UseCase = require('./use-cases/UseCase');
const CreateProduct = require('./use-cases/CreateProduct');
const GetProduct = require('./use-cases/GetProduct');
const SearchProducts = require('./use-cases/SearchProducts');
const UpdateProduct = require('./use-cases/UpdateProduct');
const AdjustStock = require('./use-cases/AdjustStock');
const DeleteProduct = require('./use-cases/DeleteProduct');
const BaseDto = require('./dtos/BaseDto');
const CreateProductCommand = require('./dtos/CreateProductCommand');
const UpdateProductCommand = require('./dtos/UpdateProductCommand');
const AdjustStockCommand = require('./dtos/AdjustStockCommand');
const ProductResponse = require('./dtos/ProductResponse');
const ProductListResponse = require('./dtos/ProductListResponse');

module.exports = {
  UseCase,
  CreateProduct,
  GetProduct,
  SearchProducts,
  UpdateProduct,
  AdjustStock,
  DeleteProduct,
  BaseDto,
  CreateProductCommand,
  UpdateProductCommand,
  AdjustStockCommand,
  ProductResponse,
  ProductListResponse,
};
