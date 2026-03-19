const ProductRepository = require('../../../domain/repositories/ProductRepository');
const Product = require('../../../domain/entities/Product');

class ProductRepositoryImpl extends ProductRepository {
  constructor() {
    super();
    this.products = new Map();
  }

  async findById(id) {
    return this.products.get(id) || null;
  }

  async findAll(filters = {}) {
    const allProducts = Array.from(this.products.values());
    if (Object.keys(filters).length === 0) {
      return allProducts;
    }
    return allProducts;
  }

  async findByName(name) {
    const searchTerm = name.toLowerCase();
    return Array.from(this.products.values()).filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new Error('Entity must be a Product instance');
    }
    this.products.set(product.id, product);
    return product;
  }

  async delete(id) {
    return this.products.delete(id);
  }

  async exists(id) {
    return this.products.has(id);
  }

  async count() {
    return this.products.size;
  }

  async clear() {
    this.products.clear();
  }
}

module.exports = ProductRepositoryImpl;
