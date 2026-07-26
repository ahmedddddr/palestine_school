# Split Deployment Guide - Backend on Render, Frontend on Vercel

This guide explains how to deploy the Seeds Palestine Schools system with backend on Render and frontend on Vercel.

## Architecture Overview

- **Backend (Render)**: Node.js/Express API with MongoDB Atlas
- **Frontend (Vercel)**: Static HTML/CSS/JS files
- **Communication**: CORS-enabled API calls from frontend to backend

## Prerequisites

1. MongoDB Atlas account (free tier)
2. Render account (free tier)
3. Vercel account (free tier)
4. GitHub repository with this code

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with username and password
4. In Network Access, allow `0.0.0.0/0` (or your specific IP)
5. Click "Connect" → "Connect your application" → Driver Node.js
6. Copy the connection string (replace `<password>` with your actual password)

Example:
```
mongodb+srv://dbuser:your_password@cluster0.example.mongodb.net/school-management?retryWrites=true&w=majority
```

## Step 2: Deploy Backend to Render

### Option A: Using Render Blueprint (Recommended)

1. Push your code to GitHub
2. Go to https://dashboard.render.com/blueprints
3. Click "New from YAML" → select your repository
4. Fill in the environment variable:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
5. Click "Apply" to deploy

### Option B: Manual Deployment

1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: seeds-palestine-schools-backend
   - **Region**: Frankfurt (or closest to you)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `TRUST_PROXY`: `true`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FORCE_FILE_STORAGE`: `false`
   - `SERVE_STATIC`: `false` (Important: disables static file serving)
   - `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (Update after Vercel deployment)
   - `SESSION_SECRET`: Generate a random string
   - `SUPER_ADMIN_USERNAME`: `superadmin`
   - `SUPER_ADMIN_PASSWORD`: Generate a secure password
   - `BRANCH_ADMIN_USERNAME`: `branchadmin`
   - `BRANCH_ADMIN_PASSWORD`: Generate a secure password
6. Click "Deploy Web Service"

### After Backend Deployment

1. Wait for deployment to complete
2. Note your backend URL (e.g., `https://seeds-palestine-schools-backend.onrender.com`)
3. Migrate seed data:
   ```bash
   MONGODB_URI=mongodb+srv://... node migrate-files-to-mongodb.js
   ```

## Step 3: Deploy Frontend to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   vercel login
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. Add environment variable in Vercel dashboard:
   - Go to your project in Vercel dashboard
   - Settings → Environment Variables
   - Add: `API_BASE_URL` = `https://your-render-backend.onrender.com`
   - Redeploy after adding

4. Note your frontend URL (e.g., `https://seeds-palestine-schools-frontend.vercel.app`)

## Step 4: Update Backend CORS Configuration

1. Go to your Render dashboard
2. Navigate to your backend service
3. Environment Variables
4. Update `FRONTEND_URL` to your actual Vercel frontend URL
5. Redeploy the backend

## Step 5: Test the Deployment

1. Visit your Vercel frontend URL
2. Try logging in with:
   - **Super Admin**: `superadmin` / (password you set)
   - **Branch Admin**: `branchadmin` / (password you set)
3. Test all features (students, attendance, fees, bus subscriptions)

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in Render matches your exact Vercel URL
- Check browser console for specific CORS errors

### Session/Cookie Issues
- Ensure `SESSION_SECRET` is set in Render
- Check that `credentials: 'same-origin'` is included in fetch calls

### Data Not Persisting
- Verify `MONGODB_URI` is correct in Render
- Check MongoDB Atlas cluster is running
- Run migration script if data is missing

### API Calls Failing
- Check `API_BASE_URL` is set correctly in Vercel
- Verify backend is deployed and running
- Check Render logs for errors

## File Structure After Split

```
palestine_schools-main/
├── backend/               # Backend API (Render)
│   ├── server.js          # Main Express server
│   ├── package.json       # Backend dependencies
│   ├── render.yaml        # Render configuration
│   ├── migrate-files-to-mongodb.js
│   ├── database-setup.js
│   ├── setup-mongodb.js
│   ├── test-mongodb-data.js
│   ├── test-auth.js
│   ├── fix-data-integrity.js
│   ├── hybrid-server.js
│   ├── mongodb-server.js
│   ├── enable-server-storage.js
│   ├── sample-data.js
│   ├── data-sync.js
│   ├── .env.example
│   ├── students.json
│   ├── attendance.json
│   ├── fees.json
│   └── busSubscriptions.json
├── frontend/              # Frontend files (Vercel)
│   ├── public/
│   │   ├── html/
│   │   │   ├── login.html
│   │   │   ├── index.html
│   │   │   ├── master-control.html
│   │   │   ├── branch-admin.html
│   │   │   └── teacher.html
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── script.js      # Updated with API_BASE_URL
│   │       └── data-sync.js
│   └── frontend-config.js     # Frontend API configuration
├── render.yaml            # Render configuration (root level)
└── vercel.json            # Vercel configuration (root level)
```

## Environment Variables Summary

### Render (Backend)
- `MONGODB_URI`: MongoDB Atlas connection string
- `SERVE_STATIC`: `false` (disables static file serving)
- `FRONTEND_URL`: Your Vercel frontend URL
- `SESSION_SECRET`: Random string for session encryption
- `SUPER_ADMIN_PASSWORD`: Super admin password
- `BRANCH_ADMIN_PASSWORD`: Branch admin password

### Vercel (Frontend)
- `API_BASE_URL`: Your Render backend URL

## Security Notes

- Change default passwords immediately after first login
- Use strong, unique passwords for all accounts
- Keep MongoDB credentials secure
- Use HTTPS for all connections (both platforms provide this)
- Regularly update dependencies
