"""
Database Initialization Script

Run this script to create all database tables on Railway PostgreSQL.
This should be run once after setting up your DATABASE_URL in the .env file.

Usage:
    python init_db.py
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from db_models import Base

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    print("🚀 Initializing database...")
    print("📊 Creating tables...")
    
    try:
        # Get DATABASE_URL from environment
        database_url = os.getenv("DATABASE_URL")
        
        if not database_url:
            print("❌ ERROR: DATABASE_URL not found in .env file!")
            print("💡 Please add your Railway PostgreSQL connection string to .env")
            exit(1)
        
        print(f"📡 Connecting to database...")
        
        # Create engine
        engine = create_engine(
            database_url,
            pool_pre_ping=True,
            echo=True  # Show SQL queries
        )
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database tables created successfully!")
        print("🎉 You can now start the FastAPI server.")
        print("\nCreated tables:")
        print("  - users")
        print("  - daily_responses")
        print("  - behavior_signals")
        print("  - risk_analyses")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        print(f"💡 Error type: {type(e).__name__}")
        print("💡 Make sure your DATABASE_URL in .env is correct.")
        import traceback
        traceback.print_exc()
