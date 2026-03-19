const ValueObject = require('../value-objects/ValueObject');

class Money extends ValueObject {
  constructor(amount, currency = 'USD') {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!currency || typeof currency !== 'string') {
      throw new Error('Currency must be a valid string');
    }
    super({ amount, currency });
  }

  get amount() {
    return this.props.amount;
  }

  get currency() {
    return this.props.currency;
  }

  add(other) {
    if (!(other instanceof Money)) {
      throw new Error('Other must be a Money instance');
    }
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other) {
    if (!(other instanceof Money)) {
      throw new Error('Other must be a Money instance');
    }
    if (this.currency !== other.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new Error('Result cannot be negative');
    }
    return new Money(result, this.currency);
  }

  multiply(factor) {
    if (typeof factor !== 'number') {
      throw new Error('Factor must be a number');
    }
    return new Money(this.amount * factor, this.currency);
  }

  isGreaterThan(other) {
    if (!(other instanceof Money)) {
      throw new Error('Other must be a Money instance');
    }
    return this.amount > other.amount;
  }

  isLessThan(other) {
    if (!(other instanceof Money)) {
      throw new Error('Other must be a Money instance');
    }
    return this.amount < other.amount;
  }
}

module.exports = Money;
