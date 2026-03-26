const { ValidationError } = require('../../../shared');

class CreateProductCommand {
  constructor({ name, description, price, stock, currency = 'USD' }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.currency = currency;
    this.validate();
  }

  validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new ValidationError('Name is required');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new ValidationError('Description is required');
    }
    if (typeof this.price !== 'number' || this.price < 0) {
      throw new ValidationError('Price must be a non-negative number');
    }
    if (typeof this.stock !== 'number' || this.stock < 0) {
      throw new ValidationError('Stock must be a non-negative number');
    }
  }
}

module.exports = CreateProductCommand;
