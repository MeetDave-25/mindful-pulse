"""
Simple startup script for the FastAPI backend
This handles the import path correctly
"""
import sys
import os

# Add the parent directory to Python path
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

# Now we can import and run
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting Burnout Analysis Backend...")
    print("📡 Server will be available at: http://127.0.0.1:8000")
    print("📚 API Documentation: http://127.0.0.1:8000/docs")
    print("\nPress CTRL+C to stop the server\n")
    
    # Run with proper module path
    uvicorn.run(
        "backend.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )
