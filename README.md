# Mindful Pulse (Burnout Analysis)

Backend (FastAPI) + Frontend (Vite + React)

This repository contains the backend API (in `backend/`) and the frontend app (`mindful-pulse/`).

## Quick start (development)

1. Backend

- Create a `.env` file in `backend/` or place env vars in root `.env`
- Example environment variables are provided in `.env.example`.

```sh
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

2. Frontend

```sh
cd mindful-pulse
npm ci
npm run dev
# Open http://localhost:8080
```

## Security & Git

- **Do not commit `.env`** — it contains secrets (DATABASE_URL, SECRET_KEY). A root `.gitignore` is included which ignores environment files and `node_modules`.
- Use `.env.example` to document required variables without including secrets.

## Tests

- Run backend tests:

```sh
python -m pytest -q
```

## Pushing to GitHub

1. Create the remote repository on GitHub (you already provided: `https://github.com/MeetDave-25/mindful-pulse.git`).
2. Locally, set remote and push:

```sh
git remote add origin https://github.com/MeetDave-25/mindful-pulse.git
git branch -M main
git push -u origin main
```

If you want, I can try to set the remote and push from here — confirm and I'll attempt it (note: pushing requires credentials).

---

If you want, I can also set up a GitHub Actions workflow to run tests on push and optionally build/publish Docker images.