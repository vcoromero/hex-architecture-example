const { Pool } = require('pg');
const ProductRepository = require('../../../domain/repositories/ProductRepository');
const Product = require('../../../domain/entities/Product');
const Money = require('../../../domain/value-objects/Money');
const StockLevel = require('../../../domain/value-objects/StockLevel');

class ProductRepositoryPostgresImpl extends ProductRepository {
  constructor(config) {
    super();
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.name,
      user: config.user,
      password: config.password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  async findById(id) {
    const query = `
      SELECT id, name, description, price_amount, price_currency,
             stock_quantity, stock_reserved, created_at, updated_at
      FROM products WHERE id = $1
    `;
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToProduct(result.rows[0]);
  }

  async findAll(filters = {}) {
    let query = `
      SELECT id, name, description, price_amount, price_currency,
             stock_quantity, stock_reserved, created_at, updated_at
      FROM products WHERE 1=1
    `;
    const params = [];

    if (filters.name) {
      params.push(`%${filters.name}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    if (filters.minPrice !== undefined) {
      params.push(filters.minPrice);
      query += ` AND price_amount >= $${params.length}`;
    }

    if (filters.maxPrice !== undefined) {
      params.push(filters.maxPrice);
      query += ` AND price_amount <= $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      params.push(filters.limit);
      query += ` LIMIT $${params.length}`;
    }

    if (filters.offset) {
      params.push(filters.offset);
      query += ` OFFSET $${params.length}`;
    }

    const result = await this.pool.query(query, params);
    return result.rows.map((row) => this.mapToProduct(row));
  }

  async findByName(name) {
    const query = `
      SELECT id, name, description, price_amount, price_currency,
             stock_quantity, stock_reserved, created_at, updated_at
      FROM products WHERE name ILIKE $1
      ORDER BY created_at DESC
    `;
    const result = await this.pool.query(query, [`%${name}%`]);
    return result.rows.map((row) => this.mapToProduct(row));
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new Error('Entity must be a Product instance');
    }

    const query = `
      INSERT INTO products (id, name, description, price_amount, price_currency,
                           stock_quantity, stock_reserved, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price_amount = EXCLUDED.price_amount,
        price_currency = EXCLUDED.price_currency,
        stock_quantity = EXCLUDED.stock_quantity,
        stock_reserved = EXCLUDED.stock_reserved,
        updated_at = EXCLUDED.updated_at
      RETURNING id, name, description, price_amount, price_currency,
                stock_quantity, stock_reserved, created_at, updated_at
    `;

    const values = [
      product.id,
      product.name,
      product.description,
      product.price.amount,
      product.price.currency,
      product.stock.quantity,
      product.stock.reserved,
      product.createdAt,
      new Date(),
    ];

    const result = await this.pool.query(query, values);
    return this.mapToProduct(result.rows[0]);
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rowCount > 0;
  }

  async exists(id) {
    const query = 'SELECT 1 FROM products WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows.length > 0;
  }

  mapToProduct(row) {
    const product = new Product(
      row.id,
      row.name,
      row.description,
      new Money(parseFloat(row.price_amount), row.price_currency),
      new StockLevel(parseInt(row.stock_quantity), parseInt(row.stock_reserved))
    );
    product.createdAt = row.created_at;
    product.updatedAt = row.updated_at;
    return product;
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = ProductRepositoryPostgresImpl;
