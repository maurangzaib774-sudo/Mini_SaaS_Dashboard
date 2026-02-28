# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Database Setup (PostgreSQL)

**📖 For detailed step-by-step instructions, see [DATABASE_SETUP.md](DATABASE_SETUP.md)**

#### Quick Start - Using Supabase (Easiest - Recommended):
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to SQL Editor → New Query
4. Copy and paste contents of `database/schema.sql` → Run
5. Copy and paste contents of `database/seed.sql` → Run
6. Go to Project Settings → Database → Copy connection string
7. Update `backend/.env` with database credentials

#### Using Local PostgreSQL (Command Line):
```bash
# Create database
createdb mini_sass_dashboard

# Run schema
psql -U postgres -d mini_sass_dashboard -f database/schema.sql

# Seed data (optional)
psql -U postgres -d mini_sass_dashboard -f database/seed.sql
```

#### Using pgAdmin (GUI):
1. Open pgAdmin → Create Database: `mini_sass_dashboard`
2. Right-click database → Query Tool
3. Open `database/schema.sql` → Execute
4. Open `database/seed.sql` → Execute

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# For Supabase, extract credentials from connection string:
# postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
# DB_HOST=[HOST]
# DB_PASSWORD=[PASSWORD]
# DB_PORT=[PORT] (usually 5432)

# Start server
npm start
# Or for development:
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file (optional)
cp .env.example .env

# Start development server
npm start
```

### 4. Testing the Application

1. **Backend Health Check:**
   - Open browser: `http://localhost:5000/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Register a User:**
   ```bash
   curl -X POST http://localhost:5000/api/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```
   Copy the token from the response.

4. **Test Projects API (with token):**
   ```bash
   curl -X GET http://localhost:5000/api/projects \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

5. **Frontend:**
   - Open `http://localhost:3000`
   - Note: Frontend currently doesn't have login UI, so you'll need to authenticate via API first
   - For testing, you can temporarily modify the frontend to skip auth or add a login component

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: React will prompt to use a different port

### Database Connection Failed
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `backend/.env`
- For Supabase: Ensure IP is whitelisted in database settings

### CORS Errors
- Backend CORS is configured for development
- Ensure backend URL matches `REACT_APP_API_URL` in frontend `.env`

### Module Not Found
- Run `npm install` in both frontend and backend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Next Steps

1. Add a login component to the frontend for user authentication
2. Implement token refresh mechanism
3. Add pagination for projects table
4. Add project details view
5. Implement real-time updates with WebSockets (optional)
