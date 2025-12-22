from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, daily, signals, dashboard

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Backend for Digital Burnout Early-Warning System"
)

# CORS - Allow frontend origins
# In production, set ALLOWED_ORIGINS environment variable with your Vercel URL
allowed_origins_env = settings.ALLOWED_ORIGINS if hasattr(settings, 'ALLOWED_ORIGINS') else ""

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

# Add production origins from environment variable
if allowed_origins_env:
    production_origins = [origin.strip() for origin in allowed_origins_env.split(",")]
    origins.extend(production_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],  # Allow all if no specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(daily.router, prefix="/daily", tags=["Daily Questions"])
app.include_router(signals.router, prefix="/signals", tags=["Behavioral Signals"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.get("/")
def root():
    return {"message": "Burnout Analysis System API is running."}
