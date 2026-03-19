const ValueObject = require('../value-objects/ValueObject');

class StockLevel extends ValueObject {
  constructor(quantity, reserved = 0) {
    if (typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Quantity must be a non-negative number');
    }
    if (typeof reserved !== 'number' || reserved < 0) {
      throw new Error('Reserved must be a non-negative number');
    }
    if (reserved > quantity) {
      throw new Error('Reserved cannot exceed quantity');
    }
    super({ quantity, reserved });
  }

  get quantity() {
    return this.props.quantity;
  }

  get reserved() {
    return this.props.reserved;
  }

  get available() {
    return this.quantity - this.reserved;
  }

  isAvailable(amount = 1) {
    return this.available >= amount;
  }

  increase(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    return new StockLevel(this.quantity + amount, this.reserved);
  }

  decrease(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    const newQuantity = this.quantity - amount;
    if (newQuantity < 0) {
      throw new Error('Cannot decrease below zero');
    }
    return new StockLevel(newQuantity, this.reserved);
  }

  reserve(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!this.isAvailable(amount)) {
      throw new Error('Not enough stock available to reserve');
    }
    return new StockLevel(this.quantity, this.reserved + amount);
  }

  releaseReservation(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    if (amount > this.reserved) {
      throw new Error('Cannot release more than reserved');
    }
    return new StockLevel(this.quantity, this.reserved - amount);
  }

  confirmReservation(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    if (amount > this.reserved) {
      throw new Error('Cannot confirm more than reserved');
    }
    return new StockLevel(this.quantity - amount, this.reserved - amount);
  }
}

module.exports = StockLevel;
