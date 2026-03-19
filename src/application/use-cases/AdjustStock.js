const AdjustStockCommand = require('../../dtos/AdjustStockCommand');
const ProductResponse = require('../../dtos/ProductResponse');

class AdjustStock {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(command) {
    const adjustCommand = command instanceof AdjustStockCommand 
      ? command 
      : new AdjustStockCommand(command);

    const product = await this.productRepository.findById(adjustCommand.id);
    if (!product) {
      throw new Error(`Product with ID ${adjustCommand.id} not found`);
    }

    const newQuantity = product.stock.quantity + adjustCommand.amount;
    if (newQuantity < 0) {
      throw new Error('Stock cannot be negative');
    }

    product.adjustStock(adjustCommand.amount);
    const updatedProduct = await this.productRepository.save(product);
    return new ProductResponse(updatedProduct);
  }
}

module.exports = AdjustStock;
