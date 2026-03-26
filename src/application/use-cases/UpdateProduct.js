const { NotFoundError } = require('../../../shared');
const UpdateProductCommand = require('../../dtos/UpdateProductCommand');
const ProductResponse = require('../../dtos/ProductResponse');

class UpdateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(command) {
    const updateCommand = command instanceof UpdateProductCommand 
      ? command 
      : new UpdateProductCommand(command);

    const product = await this.productRepository.findById(updateCommand.id);
    if (!product) {
      throw new NotFoundError(`Product with ID ${updateCommand.id} not found`);
    }

    if (updateCommand.name !== undefined) {
      product.updateName(updateCommand.name);
    }
    if (updateCommand.description !== undefined) {
      product.updateDescription(updateCommand.description);
    }
    if (updateCommand.price !== undefined) {
      product.updatePrice(updateCommand.price);
    }
    if (updateCommand.stock !== undefined) {
      const currentStock = product.stock.quantity;
      const stockDiff = updateCommand.stock - currentStock;
      if (stockDiff !== 0) {
        product.adjustStock(stockDiff);
      }
    }

    const updatedProduct = await this.productRepository.save(product);
    return new ProductResponse(updatedProduct);
  }
}

module.exports = UpdateProduct;
