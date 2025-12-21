# Mindful Pulse (Burnout Analysis)

A comprehensive mental wellness monitoring application with FastAPI backend and React frontend.

This repository contains the backend API (in `backend/`) and the frontend app (`mindful-pulse/`).

## Quick Start (Development)

### Backend

Create a `.env` file in `backend/` or place env vars in root `.env`. Example environment variables are provided in `.env.example`.

```sh
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend

Requirements: Node.js (>=18) and npm.

```sh
# Install dependencies
cd mindful-pulse
npm ci

# Start dev server
npm run dev
# Open http://localhost:8080
```

## Security & Git

- **Do not commit `.env`** — it contains secrets (DATABASE_URL, SECRET_KEY). A root `.gitignore` is included which ignores environment files and `node_modules`.
- Use `.env.example` to document required variables without including secrets.

## Tests

Run backend tests:

```sh
python -m pytest -q
```

## Build & Preview

```sh
# Build production assets
npm run build

# Serve built assets locally
npm run preview
```

## Deployment Notes

- This app expects a backend API at `http://127.0.0.1:8000` in development. Set `API_BASE_URL` in `src/services/api.ts` to your deployed backend URL when hosting.
- For production deployments, build the frontend (`npm run build`) and serve the static assets with a static server (nginx, Netlify, Vercel, Render, etc.).

## Pushing to GitHub

1. Create the remote repository on GitHub: `https://github.com/MeetDave-25/mindful-pulse.git`
2. Locally, set remote and push:

```sh
git remote add origin https://github.com/MeetDave-25/mindful-pulse.git
git branch -M main
git push -u origin main
```

## Contributing

Open a PR with changes and ensure the dev server and build steps succeed locally before merging.
