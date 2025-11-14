# JWT Authentication System

A complete React authentication system implementing JWT access and refresh tokens with NestJS backend and Next.js frontend.

## Features

### Authentication Flow
- **Login/Logout**: Secure user authentication with JWT tokens
- **Access Tokens**: Short-lived tokens (15 minutes) for API requests
- **Refresh Tokens**: Long-lived tokens (7 days) stored in localStorage
- **Automatic Token Refresh**: Seamless token renewal when access tokens expire
- **Protected Routes**: Client-side route protection with authentication checks

### Technology Stack
- **Backend**: NestJS with TypeORM, PostgreSQL, Passport, JWT
- **Frontend**: Next.js 14, React Query, React Hook Form, Tailwind CSS
- **Authentication**: JWT access/refresh token pattern
- **Validation**: Class-validator for backend, React Hook Form for frontend
- **State Management**: React Query for server state, React Context for auth state

### Security Features
- **Token Storage**: Access tokens in memory, refresh tokens in localStorage
- **Automatic Logout**: On refresh token expiration or invalid tokens
- **Request Interceptors**: Automatic token attachment and refresh handling
- **Protected Endpoints**: Server-side authentication guards
- **Password Hashing**: bcrypt for secure password storage

## Project Structure

```
├── server/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/       # Data transfer objects
│   │   │   ├── guards/    # Authentication guards
│   │   │   └── strategies/ # Passport strategies
│   │   ├── user/          # User module
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.entity.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── client/                # Next.js Frontend
│   ├── app/              # App router pages
│   │   ├── login/        # Login page
│   │   ├── signup/       # Registration page
│   │   ├── dashboard/    # Protected dashboard
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable components
│   │   ├── ui/          # UI components
│   │   ├── navigation.tsx
│   │   └── protected-route.tsx
│   ├── lib/             # Utilities and hooks
│   │   ├── api.ts       # Axios configuration
│   │   ├── auth-context.tsx
│   │   └── auth-hooks.ts
│   └── package.json
└── README.md
```

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

## Usage

1. **Registration**: Visit `/signup` to create a new account
2. **Login**: Visit `/login` to authenticate
3. **Dashboard**: Access `/dashboard` (protected route) after login
4. **Automatic Token Refresh**: Tokens refresh automatically on API calls
5. **Logout**: Use logout button to clear all tokens and redirect to login

## Authentication Flow

1. **User Login**: Credentials sent to `/auth/login`
2. **Token Generation**: Server returns access token (15min) and refresh token (7d)
3. **Token Storage**: Access token in memory, refresh token in localStorage
4. **API Requests**: Access token automatically attached to requests
5. **Token Expiry**: When access token expires, refresh token used automatically
6. **Token Refresh**: New tokens generated and stored
7. **Logout**: All tokens cleared from memory and storage

## Error Handling

- **Invalid Credentials**: Clear error messages on login failure
- **Token Expiry**: Automatic refresh or redirect to login
- **Network Errors**: User-friendly error messages
- **Validation Errors**: Real-time form validation feedback

## Security Considerations

- Access tokens have short expiration (15 minutes)
- Refresh tokens stored in localStorage (consider httpOnly cookies for production)
- Passwords hashed with bcrypt
- CORS configured for frontend domain
- Input validation on both client and server
- Protected routes require valid authentication

## Deployment

### Backend Deployment
1. Set production environment variables
2. Disable TypeORM synchronization
3. Use database migrations
4. Configure CORS for production domain

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` for production API
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platform

## Public URL

Once deployed, the application will be accessible at your hosting platform's provided URL.

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **Next.js**: React framework with App Router
- **TypeORM**: Object-relational mapping
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **React Query**: Server state management
- **React Hook Form**: Form handling and validation
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client with interceptors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.