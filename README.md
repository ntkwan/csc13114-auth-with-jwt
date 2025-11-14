# JWT Authentication System

A complete React authentication system implementing JWT access and refresh tokens with NestJS backend and Next.js frontend.

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables** - Create `.env` file:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=auth_db
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables** - Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Database Setup

The application uses TypeORM with automatic synchronization enabled for development. The database tables will be created automatically when you start the server.

For production, disable synchronization and use migrations:
```typescript
// In app.module.ts
synchronize: false, // Set to false in production
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `POST /auth/profile` - Get user profile (protected)

### User Management
- `POST /user/register` - User registration
