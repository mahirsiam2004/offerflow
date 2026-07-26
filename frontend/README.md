# OfferFlow - Job Application Tracker

A premium SaaS web application for tracking internship and job applications.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Shadcn UI
- Firebase Authentication
- React Hook Form
- Zod
- TanStack Query
- Axios
- Framer Motion
- Recharts
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Admin SDK for token verification
- Multer
- Cloudinary
- Nodemailer

## Features

- Dashboard with statistics and charts
- Applications CRUD
- Interview scheduling and tracking
- Follow-up management
- Company management
- Document storage (Resume, Cover Letter)
- Calendar integration
- Analytics and insights
- Notifications
- User Profile
- Settings
- Search and filtering
- Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ or npm 9+
- Firebase project with Authentication enabled
- MongoDB Atlas account
- Cloudinary account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your Firebase credentials in `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd ../backend
   npm install
   ```

2. Create `.env` file from `.env.example`

3. Configure MongoDB connection string and Firebase Admin SDK credentials

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Frontend (.env)

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```bash
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=
FIREBASE_SERVICE_ACCOUNT_KEY=
```

## API Endpoints

### Users
- `POST /users` - Create user
- `GET /users/:email` - Get user by email
- `PATCH /users/:id` - Update user

### Applications
- `GET /applications` - Get all applications
- `POST /applications` - Create application
- `GET /applications/:id` - Get application by ID
- `PATCH /applications/:id` - Update application
- `DELETE /applications/:id` - Delete application

### Companies
- `GET /companies` - Get all companies
- `POST /companies` - Create company
- `PATCH /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Interviews
- `GET /interviews` - Get all interviews
- `POST /interviews` - Create interview
- `PATCH /interviews/:id` - Update interview
- `DELETE /interviews/:id` - Delete interview

### Follow-ups
- `GET /followups` - Get all follow-ups
- `POST /followups` - Create follow-up
- `PATCH /followups/:id` - Update follow-up
- `DELETE /followups/:id` - Delete follow-up

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/charts` - Get chart data

## Database Collections

- `users` - User profiles
- `applications` - Job applications
- `companies` - Company information
- `interviews` - Interview details
- `followups` - Follow-up records
- `documents` - User documents (resumes, cover letters)
- `notifications` - User notifications

## Design System

- Primary: #2563EB
- Secondary: #4F46E5
- Success: #22C55E
- Warning: #F59E0B
- Danger: #EF4444
- Background: #F8FAFC
- Surface: #FFFFFF

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is proprietary software.