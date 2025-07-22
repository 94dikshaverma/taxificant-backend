# Taxificant Backend API

A production-ready NestJS backend API for the Taxificant project with TypeORM, validation, and comprehensive documentation.

## Features

- 🏗️ **Clean Architecture**: Modular structure following NestJS best practices
- 📊 **Database**: TypeORM with SQLite (development) and MySQL support (production)
- 🔒 **Authentication**: JWT-based authentication system
- 📝 **Validation**: Input validation using class-validator
- 📚 **Documentation**: Auto-generated Swagger/OpenAPI documentation
- 🔄 **Migrations**: Database migrations and seeders
- 🎯 **Error Handling**: Global exception filters and standardized responses
- ✅ **Testing**: Jest testing setup
- 🔧 **Configuration**: Environment-based configuration

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migration:run

# Seed the database (optional)
npm run seed

# Start development server
npm run start:dev
```

The API will be available at:
- API: `http://localhost:3001/api/v1`
- Documentation: `http://localhost:3001/api/v1/docs`

## Project Structure

```
src/
├── common/                 # Shared utilities and interfaces
│   ├── filters/           # Global exception filters
│   ├── interceptors/      # Response interceptors
│   ├── interfaces/        # TypeScript interfaces
│   └── pipes/            # Custom validation pipes
├── database/              # Database configuration and migrations
│   ├── migrations/        # TypeORM migrations
│   └── seeds/            # Database seeders
├── modules/               # Feature modules
│   ├── auth/             # Authentication module
│   └── users/            # Users module
├── app.module.ts          # Root application module
└── main.ts               # Application entry point
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Users
- `GET /api/v1/users` - Get all users (with pagination and filtering)
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create a new user
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Environment Variables

```env
# Database Configuration
DATABASE_TYPE=sqlite
DATABASE_PATH=./database.sqlite

# Application Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# API Configuration
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000
```

## Database Operations

### Migrations

```bash
# Create a new migration
npm run migration:create src/database/migrations/YourMigrationName

# Generate migration from entity changes
npm run migration:generate src/database/migrations/YourMigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Seeding

```bash
# Run all seeders
npm run seed
```

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## API Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "message": "Human readable message",
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/v1/users",
    "method": "GET"
  }
}
```

## Validation

The API uses class-validator for input validation. All DTOs include comprehensive validation rules with custom error messages.

Example validation errors:
```json
{
  "success": false,
  "error": [
    "Please provide a valid email address",
    "Password must be at least 6 characters long"
  ],
  "message": "Validation failed"
}
```

## Production Deployment

1. Set environment variables for production
2. Use a production database (MySQL/PostgreSQL)
3. Run migrations: `npm run migration:run`
4. Build the application: `npm run build`
5. Start the application: `npm run start:prod`

## Contributing

1. Follow the established code structure and patterns
2. Add proper validation to all DTOs
3. Include Swagger documentation for new endpoints
4. Write tests for new features
5. Update this README when adding new features

## License

This project is licensed under the UNLICENSED license.