# OfferFlow

A job application tracker built with a React + TypeScript (Vite) frontend and an Express + MongoDB backend.

## Features
- Track job applications (status, priority, work location, salary, deadlines, tags)
- Manage companies, interviews, follow-ups, documents and notifications
- Analytics dashboard with charts
- Firebase auth on the frontend (email/password + Google)
- REST API with an in-memory fallback so it runs without a live database

## Prerequisites
- Node.js 18+
- A MongoDB connection string (optional — the API falls back to an in-memory store)

## Setup

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # fill in Firebase + VITE_API_URL
npm run dev           # http://localhost:5173
npm run build         # tsc + vite production build
```

### Backend
```bash
cd backend
npm install
cp .env.example .env  # set MONGODB_URI, PORT, JWT_SECRET
npm start             # http://localhost:5000
```

The backend serves `/api/*` routes. If `MONGODB_URI` is missing or unreachable,
it runs on an in-memory store so the app stays fully usable.

## Project structure
```
frontend/   React + Vite + Tailwind + shadcn-style UI
backend/    Express API + Mongoose models + in-memory fallback
```
