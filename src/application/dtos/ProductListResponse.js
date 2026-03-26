class ProductListResponse {
  constructor(products, pagination = {}) {
    this.products = products.map((p) => new ProductResponse(p));
    this.pagination = {
      total: pagination.total || products.length,
      page: pagination.page || 1,
      limit: pagination.limit || products.length,
    };
  }

  toJSON() {
    return {
      products: this.products.map((p) => p.toJSON()),
      pagination: this.pagination,
    };
  }
}

module.exports = ProductListResponse;
