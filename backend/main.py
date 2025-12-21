from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, daily, signals, dashboard

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Backend for Digital Burnout Early-Warning System"
)

# CORS
origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000", # Common frontend port
    "http://localhost:5173", # Vite default
    "http://localhost:8080", # Vite in this project runs on 8080 by default
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(daily.router, prefix="/daily", tags=["Daily Questions"])
app.include_router(signals.router, prefix="/signals", tags=["Behavioral Signals"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.get("/")
def root():
    return {"message": "Burnout Analysis System API is running."}
