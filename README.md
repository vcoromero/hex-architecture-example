# Hexagonal Architecture API 🚀

A Node.js API built with **Express.js** following **Hexagonal Architecture** and **Domain-Driven Design (DDD)** principles.

## Purpose 🎯

This project serves as a practical guide for implementing **Hexagonal Architecture** (Ports and Adapters) in Node.js using Express.js. The goal is to demonstrate how to structure a scalable, maintainable, and testable application by separating core business logic from external concerns.

## Domain Example: Products 📦

The project includes a **Products** domain to demonstrate:
- Entity with value objects
- Domain services for business logic
- Repository pattern (ports & adapters)
- Application use cases (commands & queries)
- HTTP adapters (controllers)

### Product Entity
- `name` - Product name
- `description` - Product description
- `price` - Price value object (Money)
- `stock` - Stock level value object (StockLevel)

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List/search products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| PATCH | `/products/:id/stock` | Adjust stock |
| DELETE | `/products/:id` | Delete product |

## Architecture 📐

```
src/
├── domain/                     # Core Business Logic (Pure)
│   ├── entities/              # Domain entities
│   ├── repositories/          # Repository interfaces (Ports)
│   ├── services/              # Domain services
│   └── value-objects/         # Immutable value objects
│
├── application/               # Use Cases Layer
│   ├── use-cases/             # Application use cases
│   └── dtos/                  # Data Transfer Objects
│
├── infrastructure/            # External Adapters
│   ├── adapters/
│   │   ├── http/             # HTTP controllers
│   │   └── persistence/      # Persistence adapters
│   └── repositories/         # Repository implementations
│
├── config/                   # Configuration
├── shared/                   # Shared utilities
└── index.js                  # Entry point
```

## Principles 💡

- **Hexagonal Architecture**: Core domain independent of frameworks and external tools
- **Domain-Driven Design**: Rich domain models, value objects, aggregates
- **SOLID Principles**: Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **Clean Code**: Readable, maintainable, and self-documenting code

## Tech Stack 🛠️

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: PostgreSQL + Non-relational database (future)
- **Deployment**: Cloud platform (AWS / GCP)

## Getting Started 🏃

```bash
npm install
npm start        # Production
npm run dev      # Development (with watch mode)
```

## Environment Variables 🔧

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## License 📄

MIT
