import requests
import time
import sys

import os

BASE_URL = os.getenv("BASE_URL", "http://127.0.0.1:8000")
USERNAME = os.getenv("TEST_USERNAME", "testuser")
PASSWORD = os.getenv("TEST_PASSWORD", "testpassword")

def run_test():
    print(">>> Starting System Verification...")
    
    session = requests.Session()
    
    # 1. Register
    print("\n1. Registering User...")
    reg_payload = {"username": USERNAME, "password": PASSWORD, "email": "test@example.com"}
    try:
        r = session.post(f"{BASE_URL}/auth/register", json=reg_payload)
        if r.status_code == 200:
            token = r.json()["access_token"]
            print("   [SUCCESS] Registered & Got Token")
            session.headers.update({"Authorization": f"Bearer {token}"})
        else:
            print(f"   [FAIL] Registration failed: {r.text}")
            return
    except Exception as e:
        print(f"   [ERROR] Could not connect: {e}")
        return

    # 2. Get Daily Questions
    print("\n2. Fetching Daily Questions...")
    r = session.get(f"{BASE_URL}/daily/questions")
    if r.status_code == 200:
        questions = r.json()
        print(f"   [SUCCESS] Received {len(questions)} questions")
        for q in questions:
            print(f"      - [{q['category']}] {q['text']} (ID: {q['id']})")
    else:
        print(f"   [FAIL] Could not fetch questions: {r.text}")

    # 3. Submit Responses
    print("\n3. Submitting Responses...")
    # Assume we answer standard inputs
    # q1 = ID "s1" (Refreshment - Low is bad). Let's say 2 (Tired)
    # q2 = ID "f1" (Focus - Low is bad). Let's say 2 (Distracted)
    
    if len(questions) >= 2:
        q1_id = questions[0]['id']
        q2_id = questions[1]['id']
        
        # Answer 1
        r = session.post(f"{BASE_URL}/daily/response", json={"question_id": q1_id, "answer_value": 2})
        print(f"      - Answer 1 sent: {r.status_code}")
        
        # Answer 2
        r = session.post(f"{BASE_URL}/daily/response", json={"question_id": q2_id, "answer_value": 2})
        print(f"      - Answer 2 sent: {r.status_code}")

    # 4. Track Behavior
    print("\n4. Tracking Behavior Signals...")
    # Simulate late night usage
    payload = {"type": "late_night_usage", "value": 1.0}
    r = session.post(f"{BASE_URL}/signals/track", json=payload)
    print(f"      - Late Night Usage sent: {r.status_code}")

    # 5. Check Dashboard
    print("\n5. Checking Dashboard Status...")
    r = session.get(f"{BASE_URL}/dashboard/status")
    if r.status_code == 200:
        data = r.json()
        print(f"   [SUCCESS] Dashboard Data:")
        print(f"      - Risk Level: {data['risk_level']}")
        print(f"      - Risk Score: {data['risk_score']}")
        print(f"      - Insights: {data['insights']}")
    else:
        print(f"   [FAIL] Dashboard check failed: {r.text}")

if __name__ == "__main__":
    # Wait for server to start if running via script runner (simulated)
    time.sleep(2) 
    run_test()
