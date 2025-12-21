import uvicorn
import sys
import os

# Add parent directory to path to enable imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    print("Starting Burnout Analysis Backend...")
    print("Open http://127.0.0.1:8000/docs in your browser once started.")
    # Run the app - use backend.main:app since we're running from parent directory
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
