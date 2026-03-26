const ProductListResponse = require('../../dtos/ProductListResponse');

class SearchProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(filters = {}) {
    const { name, minPrice, maxPrice, inStock, page = 1, limit = 10 } = filters;
    
    let products = await this.productRepository.findAll();

    if (name) {
      const searchTerm = name.toLowerCase();
      products = products.filter((p) => 
        p.name.toLowerCase().includes(searchTerm)
      );
    }

    if (minPrice !== undefined) {
      products = products.filter((p) => p.price.amount >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter((p) => p.price.amount <= maxPrice);
    }

    if (inStock !== undefined) {
      const shouldBeInStock = inStock === true || inStock === 'true';
      products = products.filter((p) => 
        p.isInStock() === shouldBeInStock
      );
    }

    const total = products.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return new ProductListResponse(paginatedProducts, { total, page, limit });
  }
}

module.exports = SearchProducts;
