const Product = require('../entities/Product');

class InventoryService {
  checkAvailability(product, requestedAmount = 1) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    return {
      available: product.isInStock(requestedAmount),
      requested: requestedAmount,
      stock: product.stock.quantity,
      reserved: product.stock.reserved,
    };
  }

  reserveStock(product, amount) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    if (!product.isInStock(amount)) {
      throw new Error('Not enough stock available');
    }
    return product.reserveStock(amount);
  }

  releaseStock(product, amount) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    return product.releaseStock(amount);
  }

  confirmReservation(product, amount) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    return product.confirmStockReservation(amount);
  }

  replenishStock(product, amount) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    return product.adjustStock(amount);
  }

  reduceStock(product, amount) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    if (!product.isInStock(amount)) {
      throw new Error('Not enough stock to reduce');
    }
    return product.adjustStock(-amount);
  }

  getStockStatus(product) {
    if (!(product instanceof Product)) {
      throw new Error('Product must be a Product instance');
    }
    const stock = product.stock;
    const status = {
      total: stock.quantity,
      reserved: stock.reserved,
      available: stock.available,
      isLow: stock.available < 10,
      isOutOfStock: stock.available === 0,
      isOverstocked: stock.quantity > 1000,
    };
    return status;
  }
}

module.exports = InventoryService;
