class DeleteProduct {
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

    await this.productRepository.delete(id);
    return { deleted: true, id };
  }
}

module.exports = DeleteProduct;
