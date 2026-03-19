const CreateProductCommand = require('../../dtos/CreateProductCommand');
const ProductResponse = require('../../dtos/ProductResponse');

class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(command) {
    const createCommand = command instanceof CreateProductCommand 
      ? command 
      : new CreateProductCommand(command);

    const { Product, Money } = require('../../../domain');
    const product = new Product(
      this.generateId(),
      createCommand.name,
      createCommand.description,
      new Money(createCommand.price, createCommand.currency),
      createCommand.stock
    );

    const savedProduct = await this.productRepository.save(product);
    return new ProductResponse(savedProduct);
  }

  generateId() {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = CreateProduct;
