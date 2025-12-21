import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Burnout Early-Warning System")
    PROJECT_VERSION: str = os.getenv("PROJECT_VERSION", "1.0.0")
    
    # DATABASE
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # SECURITY
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-this-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

settings = Settings()
