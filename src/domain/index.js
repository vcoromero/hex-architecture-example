const Entity = require('./entities/Entity');
const Product = require('./entities/Product');
const BaseRepository = require('./repositories/BaseRepository');
const ProductRepository = require('./repositories/ProductRepository');
const InventoryService = require('./services/InventoryService');
const PricingService = require('./services/PricingService');
const ValueObject = require('./value-objects/ValueObject');
const Money = require('./value-objects/Money');
const StockLevel = require('./value-objects/StockLevel');

module.exports = {
  Entity,
  Product,
  BaseRepository,
  ProductRepository,
  InventoryService,
  PricingService,
  ValueObject,
  Money,
  StockLevel,
};
