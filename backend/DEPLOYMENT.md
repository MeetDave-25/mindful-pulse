# Backend Deployment Guide

## Quick Deploy to Railway

### 1. Go to Railway
Visit [railway.app](https://railway.app) and login with GitHub.

### 2. Create New Project
- Click **Start a New Project**
- Select **Deploy from GitHub repo**
- Choose: `MeetDave-25/mindful-pulse`

### 3. Configure Service
After deployment starts:
- Click on the service
- Go to **Settings** tab
- Set **Root Directory**: `backend`
- Click **Save**

### 4. Add PostgreSQL Database
- Click **+ New** → **Database** → **Add PostgreSQL**
- Database will be created automatically
- `DATABASE_URL` will be auto-configured

### 5. Add Environment Variables
Go to **Variables** tab and add:

```
SECRET_KEY=your-secret-key-change-this-12345
ALLOWED_ORIGINS=https://your-app.vercel.app
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> **Important**: Replace `https://your-app.vercel.app` with your actual Vercel URL!

### 6. Get Your Backend URL
- Go to **Settings** tab
- Find **Domains** section
- Copy the Railway URL (e.g., `https://mindful-pulse-production.up.railway.app`)

### 7. Initialize Database

Option A - Using Railway CLI:
```bash
npm install -g @railway/cli
railway login
railway link
railway run python init_db_simple.py
```

Option B - Using Railway Shell:
- Go to your service in Railway dashboard
- Click on **Shell** tab
- Run: `python init_db_simple.py`

### 8. Configure Frontend on Vercel
- Go to Vercel dashboard
- Select your project
- **Settings** → **Environment Variables**
- Add:
  - **Name**: `VITE_API_BASE_URL`
  - **Value**: Your Railway URL from step 6
  - **Environment**: Production
- **Redeploy** your frontend

### 9. Test
Open your Vercel URL on mobile and test login/signup!

---

## Alternative: Deploy to Render

### 1. Go to Render
Visit [render.com](https://render.com) and login with GitHub.

### 2. Create Web Service
- Click **New** → **Web Service**
- Connect your GitHub repository
- Select: `MeetDave-25/mindful-pulse`

### 3. Configure Service
- **Name**: `mindful-pulse-api`
- **Root Directory**: `backend`
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Plan**: Free
- Click **Create Web Service**

### 4. Add PostgreSQL Database
- Click **New** → **PostgreSQL**
- **Name**: `mindful-pulse-db`
- **Plan**: Free
- Click **Create Database**
- Copy the **Internal Database URL**

### 5. Add Environment Variables
Go back to your web service:
- Click **Environment** tab
- Add:
  - `DATABASE_URL` = (paste database URL from step 4)
  - `SECRET_KEY` = `your-secret-key-123`
  - `ALLOWED_ORIGINS` = `https://your-app.vercel.app`

### 6. Initialize Database
- Wait for deployment to complete
- Go to **Shell** tab
- Run: `python init_db_simple.py`

### 7. Get Your Backend URL
- Go to your service dashboard
- Copy the URL (e.g., `https://mindful-pulse-api.onrender.com`)

### 8. Configure Frontend
Same as Railway step 8.

---

## Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | `postgresql://...` | Auto-set by Railway/Render |
| `SECRET_KEY` | Yes | `your-secret-key-123` | JWT secret key |
| `ALLOWED_ORIGINS` | Yes | `https://your-app.vercel.app` | Frontend URL |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `30` | Token expiration |

---

## Troubleshooting

### Deployment fails
- Check logs in Railway/Render dashboard
- Verify `requirements.txt` is correct
- Ensure Python version is compatible

### Database connection error
- Verify `DATABASE_URL` is set
- Check database is running
- Run `init_db_simple.py` to create tables

### CORS errors
- Verify `ALLOWED_ORIGINS` includes your Vercel URL
- Must be exact match (including https://)
- No trailing slash

### Frontend still can't connect
- Verify `VITE_API_BASE_URL` is set in Vercel
- Must be HTTPS in production
- Redeploy frontend after setting variable

---

## Files Created for Deployment

- ✅ `Procfile` - Start command for hosting platforms
- ✅ `railway.json` - Railway-specific configuration
- ✅ `requirements.txt` - Python dependencies (already exists)
- ✅ `init_db_simple.py` - Database initialization script (already exists)

---

## Next Steps

1. Choose Railway or Render
2. Follow deployment steps above
3. Set environment variables
4. Initialize database
5. Configure Vercel with backend URL
6. Test on mobile!
