# Render Backend Deployment Guide

## Manual Deployment (Recommended)

Since Blueprint auto-detection was causing issues, use manual deployment:

### Steps

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

### After Deployment

1. Note your Render backend URL (e.g., `https://seeds-palestine-schools-backend.onrender.com`)
2. Update `FRONTEND_URL` in Render environment variables with your actual Vercel URL
3. Add `API_BASE_URL` in Vercel with your Render backend URL
4. Redeploy both services

### Troubleshooting

**If backend fails to start:**
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**If CORS errors persist:**
- The backend now allows all origins for cross-origin requests
- Verify `FRONTEND_URL` is set correctly
- Check that frontend is using correct `API_BASE_URL`

**If login fails:**
- Verify backend is running and accessible
- Check that MongoDB connection works
- Test backend health endpoint: `https://your-backend.onrender.com/api/health`
