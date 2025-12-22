import requests
import json
from datetime import datetime

# Test registration
print("Testing registration endpoint...")
timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
register_data = {
    "username": f"testuser{timestamp}",
    "email": f"test{timestamp}@example.com",
    "password": "testpassword123"
}

try:
    response = requests.post(
        "http://127.0.0.1:8000/auth/register",
        json=register_data
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("\n✅ Registration successful!")
        token = response.json()["access_token"]
        
        # Test login
        print("\nTesting login endpoint...")
        login_data = {
            "username": f"testuser{timestamp}",
            "password": "testpassword123"
        }
        
        login_response = requests.post(
            "http://127.0.0.1:8000/auth/token",
            data=login_data  # OAuth2 expects form data
        )
        print(f"Login Status Code: {login_response.status_code}")
        print(f"Login Response: {json.dumps(login_response.json(), indent=2)}")
        
        if login_response.status_code == 200:
            print("\n✅ Login successful!")
        else:
            print("\n❌ Login failed!")
    else:
        print("\n❌ Registration failed!")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
