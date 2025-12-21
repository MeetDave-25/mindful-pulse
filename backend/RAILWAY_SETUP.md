# Railway PostgreSQL Setup Guide

## ✅ Completed Steps

1. ✅ Created `.env` file for database credentials
2. ✅ Updated `config.py` to load environment variables
3. ✅ Created SQLAlchemy database models (`db_models.py`)
4. ✅ Updated `database.py` with PostgreSQL connection
5. ✅ Migrated `auth.py` router to use PostgreSQL
6. ✅ Updated `requirements.txt` with new dependencies

## 🔧 Next Steps

### Step 1: Update the DATABASE_URL in `.env`

Open `d:\burnout\backend\.env` and replace the placeholder DATABASE_URL with your Railway connection string:

```env
DATABASE_URL=postgresql://your-railway-connection-string-here
```

**Important**: Paste the entire connection string you copied from Railway.

### Step 2: Install Dependencies

There seems to be a pip issue. Try one of these approaches:

**Option A - Create a virtual environment (Recommended)**:
```powershell
cd d:\burnout\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Option B - Install globally**:
```powershell
cd d:\burnout\backend
python -m pip install sqlalchemy psycopg2-binary python-dotenv alembic
```

**Option C - Use conda (if you have it)**:
```powershell
cd d:\burnout\backend
conda install sqlalchemy psycopg2 python-dotenv alembic -c conda-forge
```

### Step 3: Initialize the Database

After installing dependencies, create the database tables:

```powershell
cd d:\burnout\backend
python init_db.py
```

You should see: ✅ Database tables created successfully!

### Step 4: Start the Server

```powershell
cd d:\burnout\backend
python run.py
```

Or:

```powershell
cd d:\burnout\backend
uvicorn main:app --reload
```

### Step 5: Test the API

1. **Register a new user**:
   - POST to `http://localhost:8000/auth/register`
   - Body: `{"username": "testuser", "password": "testpass123"}`

2. **Login**:
   - POST to `http://localhost:8000/auth/token`
   - Form data: `username=testuser&password=testpass123`

3. **Get current user**:
   - GET to `http://localhost:8000/auth/me`
   - Header: `Authorization: Bearer <your-token>`

## 📝 Files Created/Modified

- ✅ `d:\burnout\backend\.env` - Environment variables (contains DATABASE_URL)
- ✅ `d:\burnout\backend\.env.example` - Template for environment variables
- ✅ `d:\burnout\backend\.gitignore` - Protects .env from being committed
- ✅ `d:\burnout\backend\config.py` - Updated to load from .env
- ✅ `d:\burnout\backend\database.py` - PostgreSQL connection setup
- ✅ `d:\burnout\backend\db_models.py` - SQLAlchemy ORM models
- ✅ `d:\burnout\backend\init_db.py` - Database initialization script
- ✅ `d:\burnout\backend\requirements.txt` - Added PostgreSQL dependencies
- ✅ `d:\burnout\backend\routers\auth.py` - Updated to use PostgreSQL

## 🔍 Troubleshooting

### Database Connection Error
- Make sure the DATABASE_URL in `.env` is correct
- Check that Railway PostgreSQL is running in your dashboard
- Verify your internet connection

### Import Errors
- Make sure all dependencies are installed
- Try creating a virtual environment (Option A above)

### Table Already Exists Error
- This is fine if you run `init_db.py` multiple times
- The tables are already created

## 🎯 What Changed?

**Before**: Used in-memory dictionaries (data lost on restart)
**After**: Uses PostgreSQL on Railway (data persists permanently)

All user registrations, logins, and data are now stored in your Railway PostgreSQL database!
