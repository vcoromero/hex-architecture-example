const Entity = require('./Entity');
const Money = require('../value-objects/Money');
const StockLevel = require('../value-objects/StockLevel');

class Product extends Entity {
  constructor(id, name, description, price, stock) {
    super(id);
    this.name = name;
    this.description = description;
    this.price = price instanceof Money ? price : new Money(price);
    this.stock = stock instanceof StockLevel ? stock : new StockLevel(stock);
    this.validate();
  }

  validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Product name is required');
    }
    if (this.name.length > 255) {
      throw new Error('Product name cannot exceed 255 characters');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Product description is required');
    }
    if (this.description.length > 1000) {
      throw new Error('Product description cannot exceed 1000 characters');
    }
  }

  updateName(newName) {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Product name is required');
    }
    this.name = newName;
    this.updateTimestamp();
  }

  updateDescription(newDescription) {
    if (!newDescription || newDescription.trim().length === 0) {
      throw new Error('Product description is required');
    }
    this.description = newDescription;
    this.updateTimestamp();
  }

  updatePrice(newPrice) {
    this.price = newPrice instanceof Money ? newPrice : new Money(newPrice);
    this.updateTimestamp();
  }

  adjustStock(amount) {
    const newStock = amount >= 0 
      ? this.stock.increase(amount)
      : this.stock.decrease(Math.abs(amount));
    this.stock = newStock;
    this.updateTimestamp();
    return this;
  }

  reserveStock(amount) {
    if (!this.stock.isAvailable(amount)) {
      throw new Error('Not enough stock available');
    }
    this.stock = this.stock.reserve(amount);
    this.updateTimestamp();
    return this;
  }

  releaseStock(amount) {
    this.stock = this.stock.releaseReservation(amount);
    this.updateTimestamp();
    return this;
  }

  confirmStockReservation(amount) {
    this.stock = this.stock.confirmReservation(amount);
    this.updateTimestamp();
    return this;
  }

  isInStock(amount = 1) {
    return this.stock.isAvailable(amount);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price.amount,
      priceCurrency: this.price.currency,
      stock: {
        quantity: this.stock.quantity,
        reserved: this.stock.reserved,
        available: this.stock.available,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Product;
