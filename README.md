# Kanban

A simple Kanban board app: React + Vite + Tailwind on the frontend, Express + MongoDB (Mongoose) on the backend.

## Project structure

```
kanban/
├── client/          # React app (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env         # VITE_API_URL - safe to commit, no secrets
├── server/          # Express API
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env         # DB connection string + JWT secret - never commit this
└── package.json     # root workspace config
```

This uses **npm workspaces**, so `client` and `server` each have their own
`package.json` and dependencies, but a single `npm install` at the root
installs everything correctly. This avoids the "Cannot find module" errors
that happen when dependencies get installed in the wrong folder.

## Setup

From the project root:

```bash
npm install
```

This installs both the client and server dependencies.

## Running in development

From the project root, run both client and server together:

```bash
npm run dev
```

Or run them separately (e.g. in two terminals):

```bash
npm run dev:client   # starts Vite on http://localhost:5173
npm run dev:server   # starts the API on http://localhost:3004
```

## Environment variables

- `client/.env` — `VITE_API_URL` tells the frontend where the API lives.
  Defaults to `http://localhost:3004` if not set.
- `server/.env` — `PORT`, `HOST`, `MONGODB_URI`, `JWT_SECRET`. **Keep this
  file private** — it contains your database credentials and should never be
  committed to version control or shared.

## Production build

```bash
npm run build          # builds the client into client/dist
npm start               # starts the API server
```

Serve `client/dist` with any static host, or add static-file serving to
`server/server.js` if you want one process to serve both.



crediantials:
   email: test@gmail.com
   password : 123456