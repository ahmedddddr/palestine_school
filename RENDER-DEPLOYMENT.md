# Complete Deployment Guide

## Overview

This project uses split deployment:
- **Backend**: Node.js/Express API on Render
- **Frontend**: Static HTML/CSS/JS on Vercel

## Step 1: Deploy Backend to Render

### Manual Deployment

1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository: `ahmedddddr/palestine_school`
4. Configure:

**Basic Settings:**
- Name: `seeds-palestine-schools-backend`
- Region: Frankfurt (or closest)
- Branch: `main`
- Runtime: `Node` (select manually from dropdown)

**Build & Deploy:**
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && node server.js`

**Environment Variables:**
```
NODE_ENV=production
PORT=10000
TRUST_PROXY=true
MONGODB_URI=mongodb+srv://wildacademy4_db_user:wild2345@cluster0.nnip6sq.mongodb.net/?appName=Cluster0
FORCE_FILE_STORAGE=false
SERVE_STATIC=false
FRONTEND_URL=https://your-vercel-app.vercel.app
SESSION_SECRET=<generate-random-string>
SUPER_ADMIN_USERNAME=superadmin
SUPER_ADMIN_PASSWORD=<generate-secure-password>
BRANCH_ADMIN_USERNAME=branchadmin
BRANCH_ADMIN_PASSWORD=<generate-secure-password>
LOGIN_RATE_LIMIT_WINDOW_MS=900000
LOGIN_RATE_LIMIT_MAX=15
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX=500
```

5. Click "Create Web Service"

### After Backend Deployment

1. Note your Render backend URL (e.g., `https://seeds-palestine-schools-backend.onrender.com`)
2. Test health endpoint: `https://your-backend.onrender.com/api/health`

## Step 2: Deploy Frontend to Vercel

### Manual Deployment

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import GitHub repository: `ahmedddddr/palestine_school`
4. Configure:

**Framework Preset:** Other
**Root Directory:** `frontend`
**Build Command:** (leave empty)
**Output Directory:** `public`

5. Click "Deploy"

### After Frontend Deployment

1. Note your Vercel URL (e.g., `https://seeds-palestine-schools-frontend.vercel.app`)

## Step 3: Configure Environment Variables

### On Vercel

1. Go to your Vercel project → Settings → Environment Variables
2. Add:
   - Key: `API_BASE_URL`
   - Value: `https://your-render-backend.onrender.com`
3. Click "Save"
4. Redeploy Vercel project

### On Render

1. Go to your Render service → Environment Variables
2. Update:
   - Key: `FRONTEND_URL`
   - Value: `https://your-vercel-app.vercel.app` (your actual Vercel URL)
3. Click "Save Changes"
4. Redeploy Render service

## Step 4: Test Deployment

1. Visit your Vercel URL
2. Try logging in with:
   - Username: `superadmin`
   - Password: (the password you set in Render)
3. Verify the application works correctly

## Troubleshooting

**Backend redirect loop:**
- Ensure `SERVE_STATIC=false` is set in Render environment variables
- Redeploy backend after setting this variable

**CORS errors:**
- Backend now allows all origins for cross-origin requests
- Verify `API_BASE_URL` is set correctly in Vercel
- Verify `FRONTEND_URL` is set correctly in Render

**MongoDB connection issues:**
- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access allows 0.0.0.0/0
- Test connection locally first

**Login failures:**
- Verify backend is running and accessible
- Test backend health endpoint
- Check Render logs for errors

## Default Credentials

- Super Admin: `superadmin` / (password set in Render)
- Branch Admin: `branchadmin` / (password set in Render)
