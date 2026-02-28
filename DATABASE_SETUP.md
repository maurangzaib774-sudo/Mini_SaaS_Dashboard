# Database Setup Guide - Step by Step

This guide will help you set up the PostgreSQL database for the Mini SaaS Dashboard project. Choose the method that works best for you!

---

## 🎯 **EASIEST METHOD: Using Supabase (No Installation Required)**

This is the **recommended method** if you're new to databases. Supabase provides a free PostgreSQL database in the cloud - no installation needed!

### Step 1: Create Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with your email or GitHub account (it's free!)

### Step 2: Create a New Project
1. After logging in, click **"New Project"**
2. Fill in the details:
   - **Name**: `mini-sass-dashboard` (or any name you like)
   - **Database Password**: Create a strong password (save it somewhere safe!)
   - **Region**: Choose the closest region to you
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be created

### Step 3: Open SQL Editor
1. In your project dashboard, look at the left sidebar
2. Click on **"SQL Editor"** (it has an icon that looks like `</>`)

### Step 4: Create Database Tables
1. Click **"New query"** button
2. Open the file `database/schema.sql` from this project in a text editor (like Notepad)
3. **Copy ALL the text** from `database/schema.sql`
4. **Paste it** into the Supabase SQL Editor
5. Click **"Run"** button (or press `Ctrl+Enter`)
6. You should see a success message: "Success. No rows returned"

### Step 5: Add Sample Data (Optional)
1. Open the file `database/seed.sql` from this project
2. **Copy ALL the text** from `database/seed.sql`
3. **Paste it** into the SQL Editor (you can clear the previous query first)
4. Click **"Run"** button
5. You should see: "Success. 15 rows inserted"

### Step 6: Get Database Connection Details
1. Click on **"Project Settings"** (gear icon) in the left sidebar
2. Click on **"Database"** in the settings menu
3. Scroll down to find **"Connection string"**
4. You'll see something like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. **Copy this connection string** - you'll need it for the backend!

### Step 7: Update Backend Configuration
1. Open the file `backend/.env` (create it if it doesn't exist, copy from `backend/.env.example`)
2. Extract information from your connection string:
   - Connection string format: `postgresql://postgres:PASSWORD@HOST:PORT/database`
   - Example: `postgresql://postgres:mypassword123@db.abcdefgh.supabase.co:5432/postgres`
3. Fill in your `.env` file like this:
   ```env
   DB_HOST=db.abcdefgh.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=mypassword123
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
   - Replace `db.abcdefgh.supabase.co` with your actual host
   - Replace `mypassword123` with your actual database password

**✅ Done!** Your database is now set up!

---

## 🖥️ **METHOD 2: Using pgAdmin (GUI Tool for PostgreSQL)**

If you have PostgreSQL installed locally and prefer a visual interface.

### Step 1: Install PostgreSQL
1. Download PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Choose your operating system (Windows/Mac/Linux)
3. Run the installer
4. **Remember the password** you set for the `postgres` user during installation!

### Step 2: Open pgAdmin
1. After installation, open **pgAdmin 4** (usually in Start Menu or Applications)
2. Enter the password you set during installation when prompted

### Step 3: Create Database
1. In pgAdmin, expand **"Servers"** → **"PostgreSQL"**
2. Right-click on **"Databases"**
3. Click **"Create"** → **"Database..."**
4. In the **"Database"** field, type: `mini_sass_dashboard`
5. Click **"Save"**

### Step 4: Open Query Tool
1. Expand your new database: **"mini_sass_dashboard"**
2. Right-click on **"mini_sass_dashboard"**
3. Click **"Query Tool"**

### Step 5: Run Schema Script
1. In the Query Tool, click the **"Open File"** button (folder icon)
2. Navigate to your project folder
3. Open `database/schema.sql`
4. Click **"Execute"** button (play icon) or press `F5`
5. You should see: "Query returned successfully"

### Step 6: Add Sample Data (Optional)
1. In the same Query Tool, click **"Open File"** again
2. Open `database/seed.sql`
3. Click **"Execute"** button
4. You should see: "15 rows affected"

### Step 7: Update Backend Configuration
1. Open `backend/.env` file
2. Fill in:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mini_sass_dashboard
   DB_USER=postgres
   DB_PASSWORD=your-postgres-password-here
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
   - Replace `your-postgres-password-here` with the password you set during PostgreSQL installation

**✅ Done!** Your local database is set up!

---

## 💻 **METHOD 3: Using Command Line (For Advanced Users)**

If you're comfortable with command line/terminal.

### Windows (PowerShell or Command Prompt)

#### Step 1: Open PowerShell or Command Prompt
- Press `Windows Key + X` and select "Windows PowerShell" or "Command Prompt"

#### Step 2: Navigate to Project Folder
```powershell
cd D:\test project\sass_dashboard
```

#### Step 3: Create Database
```powershell
createdb -U postgres mini_sass_dashboard
```
- Enter your PostgreSQL password when prompted

#### Step 4: Run Schema Script
```powershell
psql -U postgres -d mini_sass_dashboard -f database\schema.sql
```
- Enter your PostgreSQL password when prompted
- You should see: "CREATE TABLE", "CREATE INDEX" messages

#### Step 5: Add Sample Data (Optional)
```powershell
psql -U postgres -d mini_sass_dashboard -f database\seed.sql
```
- Enter your PostgreSQL password when prompted
- You should see: "INSERT 0 15"

### Mac/Linux (Terminal)

#### Step 1: Open Terminal
- Press `Cmd + Space` (Mac) or `Ctrl + Alt + T` (Linux)
- Type "Terminal" and press Enter

#### Step 2: Navigate to Project Folder
```bash
cd /path/to/mini_sass_dashboard
```

#### Step 3: Create Database
```bash
createdb mini_sass_dashboard
```
- If it asks for a password, enter your PostgreSQL password

#### Step 4: Run Schema Script
```bash
psql -d mini_sass_dashboard -f database/schema.sql
```
- You should see success messages

#### Step 5: Add Sample Data (Optional)
```bash
psql -d mini_sass_dashboard -f database/seed.sql
```
- You should see: "INSERT 0 15"

### Update Backend Configuration
Same as Method 2, Step 7 above.

---

## 🔍 **How to Verify Database Setup**

### Using Supabase:
1. Go to SQL Editor
2. Run this query:
   ```sql
   SELECT COUNT(*) FROM projects;
   ```
3. You should see: `15` (if you ran the seed script)

### Using pgAdmin:
1. Right-click on `projects` table
2. Click **"View/Edit Data"** → **"All Rows"**
3. You should see 15 projects listed

### Using Command Line:
```bash
psql -U postgres -d mini_sass_dashboard -c "SELECT COUNT(*) FROM projects;"
```
Should return: `15`

---

## ❓ **Troubleshooting**

### "Command not found" Error
- **Windows**: Make sure PostgreSQL is installed and added to PATH
- **Mac**: Install PostgreSQL using Homebrew: `brew install postgresql`
- **Linux**: Install PostgreSQL: `sudo apt-get install postgresql` (Ubuntu/Debian)

### "Password Authentication Failed"
- Double-check your password
- For Supabase: Use the password you set when creating the project
- For local PostgreSQL: Use the password you set during installation

### "Database does not exist"
- Make sure you created the database first
- Check the database name matches in `.env` file

### "Connection refused" or "Cannot connect"
- **Supabase**: Check if your IP is whitelisted (usually automatic)
- **Local**: Make sure PostgreSQL service is running
  - Windows: Check Services → PostgreSQL
  - Mac: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`

### "Permission denied"
- Make sure you're using the correct user (`postgres` by default)
- Check file permissions on `schema.sql` and `seed.sql`

---

## 📝 **Quick Reference: What Each File Does**

- **`database/schema.sql`**: Creates the database structure (tables, indexes)
- **`database/seed.sql`**: Adds 15 sample projects for testing
- **`database/connection.js`**: Example code showing how to connect (not needed for setup)

---

## 🎉 **Next Steps**

After setting up the database:
1. ✅ Database is ready
2. ⏭️ Go to **Backend Setup** (see `SETUP.md`)
3. ⏭️ Then **Frontend Setup**

---

## 💡 **Recommendation**

**If you're a beginner**: Use **Method 1 (Supabase)** - it's the easiest and doesn't require any installation!

**If you want to learn PostgreSQL**: Use **Method 2 (pgAdmin)** - it gives you a visual interface to explore your database.

**If you're comfortable with command line**: Use **Method 3** - it's the fastest once you know what you're doing.
