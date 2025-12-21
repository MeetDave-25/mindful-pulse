"""
Quick script to check if DATABASE_URL is properly formatted
"""
import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("❌ DATABASE_URL not found in .env file!")
else:
    print("✅ DATABASE_URL found!")
    print(f"\nFormat check:")
    
    # Hide password for security
    if "@" in database_url:
        parts = database_url.split("@")
        user_part = parts[0].split("://")[0] + "://[USER:PASS]"
        host_part = "@" + parts[1]
        safe_url = user_part + host_part
    else:
        safe_url = database_url
    
    print(f"URL: {safe_url}")
    
    # Check format
    if database_url.startswith("postgresql://"):
        print("✅ Starts with postgresql://")
    else:
        print("⚠️  Should start with postgresql://")
    
    if "@" in database_url:
        print("✅ Contains @ (user credentials)")
    else:
        print("⚠️  Missing @ (user credentials)")
    
    if ":" in database_url.split("@")[-1]:
        print("✅ Contains : (port separator)")
    else:
        print("⚠️  Missing : (port separator)")
    
    # Try to parse
    try:
        from sqlalchemy import create_engine
        engine = create_engine(database_url)
        print("\n✅ SQLAlchemy can parse the URL!")
        print("🎉 DATABASE_URL format is correct!")
    except Exception as e:
        print(f"\n❌ SQLAlchemy error: {e}")
        print("\n💡 Common issues:")
        print("  - Make sure there are no extra spaces")
        print("  - Check that port number is valid (usually 5432)")
        print("  - Verify the format: postgresql://user:password@host:port/database")
