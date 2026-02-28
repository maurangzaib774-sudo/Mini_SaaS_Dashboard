# Troubleshooting Guide

## Database Connection Issues

### Error: `ENOTFOUND db.xxxxx.supabase.co`

This error means your computer cannot find/resolve the Supabase database hostname. Here are the solutions:

#### Solution 1: Check if Supabase Project is Active

**Free tier Supabase projects pause after 1 week of inactivity!**

1. Go to [supabase.com](https://supabase.com) and log in
2. Check if your project shows "Paused" status
3. If paused, click **"Restore project"** or **"Resume"**
4. Wait 1-2 minutes for the project to resume
5. Try connecting again

#### Solution 2: Verify Database Hostname

1. Go to Supabase Dashboard → Your Project
2. Click **Project Settings** (gear icon)
3. Click **Database**
4. Scroll to **Connection string** section
5. Copy the **Host** value (should look like `db.xxxxx.supabase.co`)
6. Make sure it matches exactly in your `backend/.env` file

#### Solution 3: Check Network/Firewall

- Make sure you have internet connection
- Try accessing Supabase website in browser
- Check if your firewall/antivirus is blocking connections
- Try using a different network (mobile hotspot) to test

#### Solution 4: Verify SSL Configuration

Supabase requires SSL connections. Make sure your `backend/config/database.js` includes SSL configuration (this should already be fixed in the latest version).

#### Solution 5: Test Connection Manually

You can test if the hostname resolves:

**Windows PowerShell:**
```powershell
Test-NetConnection db.pgspmezvoxehsdlgoekz.supabase.co -Port 5432
```

**Or ping the hostname:**
```powershell
ping db.pgspmezvoxehsdlgoekz.supabase.co
```

If ping fails, the hostname might be incorrect or the project is paused.

---

### Error: `password authentication failed`

**Solution:**
1. Go to Supabase Dashboard → Project Settings → Database
2. Check your database password
3. Make sure password in `backend/.env` matches exactly
4. Note: Supabase password might be different from your account password

---

### Error: `timeout expired` or `connection timeout`

**Solutions:**
1. Check your internet connection
2. Verify Supabase project is active (not paused)
3. Increase timeout in `database.js` (already set to 10000ms)
4. Check if your IP is blocked in Supabase settings

---

### Error: `relation "projects" does not exist`

**Solution:**
You haven't run the schema script yet!

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `database/schema.sql`
3. Paste and run in SQL Editor
4. Then copy and run `database/seed.sql`

---

## Backend Server Issues

### Error: `Port 5000 already in use`

**Solution:**
Change the port in `backend/.env`:
```env
PORT=5001
```
Or find and stop the process using port 5000.

**Windows:**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

---

### Error: `Cannot find module 'express'`

**Solution:**
Install dependencies:
```bash
cd backend
npm install
```

---

## Frontend Issues

### Error: `Cannot connect to API`

**Solutions:**
1. Make sure backend is running (`npm start` in backend folder)
2. Check `frontend/.env` has correct API URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
3. Verify backend port matches (default: 5000)

---

### Error: `401 Unauthorized` or `No token provided`

**Solution:**
1. Make sure you're logged in
2. Check if token exists in browser localStorage
3. Try logging in again
4. Clear browser cache and localStorage, then refresh

---

## Common Issues Checklist

- [ ] Supabase project is active (not paused)
- [ ] Database hostname is correct in `.env`
- [ ] Database password is correct
- [ ] Schema and seed scripts have been run
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend server is running
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Port numbers match in configuration
- [ ] Internet connection is working
- [ ] Firewall/antivirus not blocking connections

---

## Still Having Issues?

1. **Check Supabase Status**: Go to [status.supabase.com](https://status.supabase.com)
2. **Check Backend Logs**: Look at the terminal where backend is running
3. **Check Browser Console**: Press F12 → Console tab for frontend errors
4. **Verify Environment Variables**: Make sure `.env` file exists and has correct values
5. **Restart Everything**: Stop backend/frontend, restart, and try again

---

## Getting Help

If you're still stuck:
1. Check the error message carefully
2. Note which step you're on (database setup, backend, frontend)
3. Check Supabase dashboard for project status
4. Verify all environment variables are set correctly
