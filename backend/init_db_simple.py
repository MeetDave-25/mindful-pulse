"""
Simple Database Initialization Script

This script initializes the database using the same logic as the main app.
It will use SQLite if no DATABASE_URL is set, or PostgreSQL if DATABASE_URL is provided.

Usage:
    python init_db_simple.py
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import init_db

if __name__ == "__main__":
    print("🚀 Initializing database...")
    try:
        init_db()
        print("🎉 Database initialization complete!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
