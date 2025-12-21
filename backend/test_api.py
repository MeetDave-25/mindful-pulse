"""
Test script to verify API endpoints work with PostgreSQL
This file uses pytest-style assertions and a fixture to provide an access token.
"""
from fastapi.testclient import TestClient
import pytest

from backend.main import app

client = TestClient(app)


def _register_user():
    """Helper that registers (or attempts to) and returns access token or None."""
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123"
    }

    response = client.post("/auth/register", json=data)
    if response.status_code == 200:
        return response.json().get("access_token")
    return None


def _login_user():
    """Helper that logs in and returns access token or None."""
    data = {
        "username": "testuser",
        "password": "testpass123"
    }

    response = client.post("/auth/token", data=data)
    if response.status_code == 200:
        return response.json().get("access_token")
    return None


@pytest.fixture(scope="module")
def token():
    """Provide an access token for tests. Try register first, fallback to login."""
    t = _register_user()
    if not t:
        t = _login_user()
    assert t is not None, "Could not obtain access token from /auth/register or /auth/token"
    return t


def test_register():
    """Ensure registration endpoint returns 200 and token. If the user already exists, fall back to login."""
    token_val = _register_user()
    if token_val is None:
        # Perhaps the user already exists from a prior test run — try logging in instead
        token_val = _login_user()
    assert token_val is not None, "Registration and login both failed to obtain access_token"


def test_login():
    """Ensure login endpoint returns 200 and token."""
    token_val = _login_user()
    assert token_val is not None, "Login failed or did not return access_token"


def test_get_current_user(token):
    """Test getting current user info"""
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/auth/me", headers=headers)
    assert response.status_code == 200, f"GET /auth/me failed: {response.status_code}"
    data = response.json()
    assert data.get("username") == "testuser" or "email" in data


if __name__ == "__main__":
    print("Run using pytest: `python -m pytest backend/test_api.py -q`")
