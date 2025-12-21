from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# Try relative import first, fall back to absolute
try:
    from .config import settings
    from .db_models import Base
except ImportError:
    from config import settings
    from db_models import Base

# Create database engine
# If no DATABASE_URL is provided, fall back to a local SQLite file for testing and dev.
if settings.DATABASE_URL:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,  # Verify connections before using them
        echo=False  # Set to True for SQL query logging during development
    )
else:
    # Use a file-based SQLite DB so tests and dev run without external dependencies
    engine = create_engine(
        "sqlite:///./test_db.sqlite3",
        connect_args={"check_same_thread": False},
        echo=False,
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get database session
def get_db():
    """
    Dependency function to get database session.
    Use this in FastAPI route dependencies.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Function to initialize database (create tables)
def init_db():
    """
    Create all tables in the database.
    Call this once when setting up the application.
    """
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
