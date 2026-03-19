class AdjustStockCommand {
  constructor({ id, amount }) {
    this.id = id;
    this.amount = amount;
    this.validate();
  }

  validate() {
    if (!this.id) {
      throw new Error('Product ID is required');
    }
    if (typeof this.amount !== 'number') {
      throw new Error('Amount must be a number');
    }
  }
}

module.exports = AdjustStockCommand;
