const ProductResponse = require('../../dtos/ProductResponse');

class GetProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error('Product ID is required');
    }
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return new ProductResponse(product);
  }
}

module.exports = GetProduct;
