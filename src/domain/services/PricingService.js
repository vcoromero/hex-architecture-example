const Product = require('../entities/Product');
const Money = require('../value-objects/Money');

class PricingService {
  calculateTotal(products) {
    if (!Array.isArray(products)) {
      throw new Error('Products must be an array');
    }
    return products.reduce((total, item) => {
      const price = item.price instanceof Money ? item.price : new Money(item.price);
      const quantity = item.quantity || 1;
      return total.add(price.multiply(quantity));
    }, new Money(0));
  }

  applyDiscount(price, discountPercentage) {
    if (!(price instanceof Money)) {
      throw new Error('Price must be a Money instance');
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    const discountAmount = price.amount * (discountPercentage / 100);
    return new Money(price.amount - discountAmount, price.currency);
  }

  calculateTax(price, taxRate) {
    if (!(price instanceof Money)) {
      throw new Error('Price must be a Money instance');
    }
    if (taxRate < 0) {
      throw new Error('Tax rate cannot be negative');
    }
    const taxAmount = price.amount * (taxRate / 100);
    return new Money(taxAmount, price.currency);
  }

  calculateFinalPrice(price, discountPercentage, taxRate) {
    let finalPrice = price;
    if (discountPercentage > 0) {
      finalPrice = this.applyDiscount(finalPrice, discountPercentage);
    }
    const tax = this.calculateTax(finalPrice, taxRate);
    return finalPrice.add(tax);
  }
}

module.exports = PricingService;
