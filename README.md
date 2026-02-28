# Mini SaaS Dashboard

A full-stack project management dashboard built with React.js, Node.js, Express, and PostgreSQL. Features JWT authentication, CRUD operations, and a responsive UI.

## Project Structure

```
mini_sass_dashboard/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service functions
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── routes/              # API routes
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth middleware
│   ├── config/              # Database configuration
│   └── server.js           # Main server file
├── database/                # PostgreSQL scripts
│   ├── schema.sql          # Database schema
│   ├── seed.sql            # Seed data
│   └── connection.js       # Connection example
└── README.md
```

## Features

### Frontend (React.js + Tailwind CSS)
- ✅ Responsive project table with columns: Status, Deadline, Assigned Team Member, Budget
- ✅ Search functionality by project name
- ✅ Filter by project status (active, on hold, completed)
- ✅ Modal form for adding/editing projects
- ✅ Input validation and error handling
- ✅ Mobile-friendly responsive design
- ✅ Smooth modal animations

### Backend (Node.js + Express)
- ✅ RESTful API endpoints for CRUD operations
- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Protected routes with authentication middleware
- ✅ PostgreSQL database integration
- ✅ Error handling and validation

### Database (PostgreSQL)
- ✅ Projects table with all required fields
- ✅ Users table for authentication
- ✅ Indexes on status field for performance
- ✅ Seed data with 15 example projects

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### 1. Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE mini_sass_dashboard;
```

3. Run the schema script:
```bash
psql -U postgres -d mini_sass_dashboard -f database/schema.sql
```

4. (Optional) Seed with sample data:
```bash
psql -U postgres -d mini_sass_dashboard -f database/seed.sql
```

#### Option B: Supabase (Recommended for Quick Setup)

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run `database/schema.sql`
4. Run `database/seed.sql` for sample data
5. Copy your database connection details from Project Settings → Database

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=mini_sass_dashboard
DB_USER=your-db-user
DB_PASSWORD=your-db-password
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
```

5. Start the backend server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, if backend is not on localhost:5000):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication (Public)

- `POST /api/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Projects (Protected - Requires JWT Token)

All project endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
  ```json
  {
    "name": "Project Name",
    "status": "active",
    "deadline": "2024-12-31",
    "assignedTeamMember": "John Doe",
    "budget": 10000
  }
  ```
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    deadline DATE NOT NULL,
    assigned_team_member VARCHAR(255) NOT NULL,
    budget NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### 1. Register/Login

First, register a new user or login using the API endpoints. The response will include a JWT token.

### 2. Use the Token

The frontend automatically stores the token in localStorage after login and includes it in all API requests.

### 3. Manage Projects

- Use the search bar to filter projects by name
- Use the status dropdown to filter by status
- Click "Add Project" to create a new project
- Click "Edit" on any project to modify it
- Click "Delete" to remove a project

## Deployment

### Option 1: Supabase (Recommended)

**Backend:**
1. Deploy backend to Heroku, Railway, or Render
2. Set environment variables in your hosting platform
3. Update frontend API URL to point to deployed backend

**Frontend:**
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or GitHub Pages
3. Set `REACT_APP_API_URL` environment variable

**Database:**
- Use Supabase PostgreSQL (already set up)
- Connection string is automatically available in Supabase dashboard

### Option 2: Firebase

**Backend:**
1. Use Firebase Cloud Functions for API endpoints
2. Use Firestore instead of PostgreSQL
3. Update controllers to use Firestore SDK

**Frontend:**
1. Deploy to Firebase Hosting: `firebase deploy`

**Database:**
- Use Firestore collections instead of SQL tables
- Migrate schema to Firestore structure

### Option 3: Traditional Deployment

**Backend:**
- Deploy to AWS EC2, DigitalOcean, or similar
- Use managed PostgreSQL (AWS RDS, DigitalOcean Managed DB)

**Frontend:**
- Build and serve static files via Nginx or Apache
- Or deploy to Vercel/Netlify

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini_sass_dashboard
DB_USER=postgres
DB_PASSWORD=your-password
PORT=5000
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check database credentials in `.env`
- Ensure database exists: `psql -l`

### CORS Errors
- Backend CORS is configured to allow all origins (development)
- For production, update CORS settings in `server.js`

### Authentication Issues
- Verify JWT_SECRET matches in both authController and authMiddleware
- Check token expiration (default: 24 hours)
- Ensure token is included in Authorization header

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **Database Driver:** pg (node-postgres)

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
