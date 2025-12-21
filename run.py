import uvicorn
import os
import sys

if __name__ == "__main__":
    # Add project root to sys.path just in case
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    
    print("Starting Burnout Analysis Backend...")
    print("Open http://127.0.0.1:8000/docs in your browser once started.")
    
    # Run the app as 'backend.main:app' so relative imports work
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
