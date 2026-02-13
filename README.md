## Blog API - NestJS + Typescript REST API

Simple REST API built using NestJS, PostgreSQL, and JWT Authentication.

This project implements a modular, scalable backend architecture with authentication, relational database, and end-to-end testing.

## Features

- User CRUD (protected with JWT + ownership validation)
- Article CRUD (protected + ownership validation)
- Comment feature (User → Article relationship)
- JWT Authentication
- DTO validation using class-validator
- Environment configuration using .env
- End-to-End (E2E) testing
- PostgreSQL relational database

## Tech Stack

- Node.js
- NestJS + Typescript
- PostgreSQL
- TypeORM
- JWT (Authentication)
- class-validator
- Jest (E2E testing)

## Architecture Pattern

This project uses:

#### Modular + Layered Architecture (Feature-Based Structure)

Each feature (Users, Articles, Comments, Auth) is separated into its own module.

Structure example:

```
src/
├── users/
├── articles/
├── comments/
├── auth/
```

Each module follows layered separation:

- Controller → handles HTTP request
- Service → business logic
- Entity → database schema
- DTO → validation layer

#### Why This Pattern?

1. Separation of concerns

2. Scalable for larger applications

3. Easy to test (unit & e2e)

4. Commonly used in real-world NestJS projects

5. Follows clean architecture principles

This structure makes the project maintainable and production-ready.

## Authentication Flow

1. User registers

2. User logs in

3. Server returns JWT token

Token must be sent in header:

`Authorization: Bearer <token>`

Protected routes:

- Create Article
- Update/Delete Article
- Update/Delete User
- Create/Delete Comment

Ownership validation ensures users can only modify their own resources.

## Database Configuration

Create a .env file:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=blog_api_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

Or you can copy-paste from file .env.example

## Run The Project

Clone Repository:

```bash
git clone https://github.com/fauzanashshidiq/blog-api-nestjs-typescript.git
```

Install Dependencies:

```bash
npm install
```

Run Development server:

```bash
npm run start:dev
```

Run E2E Testing:

```bash
npm run test:e2e
```

This test covers:

- Register user
- Login (JWT generation)
- Access protected route with token
- Fail access without token

## API Documentation

You can use Postman to test the API.

Endpoint:

- `POST /users` → Create user
- `POST /auth/login` → Login user
- `PATCH /users` → Edit user (use Bearer Token, get from login)
- `DELETE /users/1` → Delete user (use Bearer Token, get from login)
- `POST /articles` → Create article (use Bearer Token, get from login)
- `PATCH /articles/1` → Edit article (use Bearer Token, get from login)
- `DELETE /articles/1` → Delete article (use Bearer Token, get from login)
- `CREATE /comments/1` → Create comment by article (use Bearer Token, get from login)
- `READ /comments/1` → Read comment by article
- `DELETE /comments/1` → Delete comment by id_comment (use Bearer Token, get from login)
