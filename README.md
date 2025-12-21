# mindful-pulse frontend

Frontend for the Mindful Pulse app built with Vite + React + TypeScript.

## How to run locally

Requirements: Node.js (>=18) and npm.

```sh
# Install dependencies
cd mindful-pulse
npm ci

# Start dev server
npm run dev
# Open http://localhost:8080
```

## Build & Preview

```sh
# Build production assets
npm run build

# Serve built assets locally
npm run preview
```

## Deployment notes

- This app expects a backend API at `http://127.0.0.1:8000` in development. Set `API_BASE_URL` in `src/services/api.ts` to your deployed backend URL when hosting.
- For production deployments, build the frontend (`npm run build`) and serve the static assets with a static server (nginx, Netlify, Vercel, Render, etc.).

## Contributing

Open a PR with changes and ensure the dev server and build steps succeed locally before merging.
