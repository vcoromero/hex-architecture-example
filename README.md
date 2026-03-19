# Hexagonal Architecture API 🚀

A Node.js API built with **Express.js** following **Hexagonal Architecture** principles and **Clean Code** practices.

## Purpose 🎯

This project serves as a practical guide for implementing **Hexagonal Architecture** (Ports and Adapters) in Node.js using Express.js. The goal is to demonstrate how to structure a scalable, maintainable, and testable application by separating core business logic from external concerns.

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

## License 📄

MIT
