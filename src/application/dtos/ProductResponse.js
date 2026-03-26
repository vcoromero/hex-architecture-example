class ProductResponse {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = {
      amount: product.price.amount,
      currency: product.price.currency,
    };
    this.stock = {
      quantity: product.stock.quantity,
      reserved: product.stock.reserved,
      available: product.stock.available,
    };
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ProductResponse;
