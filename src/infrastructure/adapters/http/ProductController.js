const HttpController = require('./HttpController');
const { asyncHandler } = require('../../../shared');

class ProductController extends HttpController {
  constructor(router, useCases) {
    super(router);
    this.createProduct = useCases.createProduct;
    this.getProduct = useCases.getProduct;
    this.searchProducts = useCases.searchProducts;
    this.updateProduct = useCases.updateProduct;
    this.adjustStock = useCases.adjustStock;
    this.deleteProduct = useCases.deleteProduct;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      '/products',
      asyncHandler(async (req, res) => {
        const result = await this.searchProducts.execute(req.query);
        res.json(result.toJSON());
      })
    );

    this.router.get(
      '/products/:id',
      asyncHandler(async (req, res) => {
        const result = await this.getProduct.execute(req.params.id);
        res.json(result.toJSON());
      })
    );

    this.router.post(
      '/products',
      asyncHandler(async (req, res) => {
        const result = await this.createProduct.execute(req.body);
        res.status(201).json(result.toJSON());
      })
    );

    this.router.put(
      '/products/:id',
      asyncHandler(async (req, res) => {
        const command = { ...req.body, id: req.params.id };
        const result = await this.updateProduct.execute(command);
        res.json(result.toJSON());
      })
    );

    this.router.patch(
      '/products/:id/stock',
      asyncHandler(async (req, res) => {
        const command = { ...req.body, id: req.params.id };
        const result = await this.adjustStock.execute(command);
        res.json(result.toJSON());
      })
    );

    this.router.delete(
      '/products/:id',
      asyncHandler(async (req, res) => {
        const result = await this.deleteProduct.execute(req.params.id);
        res.json(result);
      })
    );
  }
}

module.exports = ProductController;
