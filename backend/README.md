# OfferFlow Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your MongoDB connection string and Firebase Admin SDK credentials

4. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/charts` - Get chart data