const { ValidationError } = require('../../../shared');

class UpdateProductCommand {
  constructor({ id, name, description, price, stock }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.validate();
  }

  validate() {
    if (!this.id) {
      throw new ValidationError('Product ID is required');
    }
    if (this.name !== undefined && this.name.trim().length === 0) {
      throw new ValidationError('Name cannot be empty');
    }
    if (this.description !== undefined && this.description.trim().length === 0) {
      throw new ValidationError('Description cannot be empty');
    }
    if (this.price !== undefined && (typeof this.price !== 'number' || this.price < 0)) {
      throw new ValidationError('Price must be a non-negative number');
    }
    if (this.stock !== undefined && (typeof this.stock !== 'number' || this.stock < 0)) {
      throw new ValidationError('Stock must be a non-negative number');
    }
  }
}

module.exports = UpdateProductCommand;
