require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection (non-fatal: API uses an in-memory store fallback
// so the server stays runnable without a live MongoDB instance).
mongoose.set('strictQuery', false)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.warn(
        'MongoDB connection unavailable — running with in-memory store fallback.',
        err.message
      )
    })
} else {
  console.warn('MONGODB_URI not set — running with in-memory store fallback.')
}

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'OfferFlow API is running', status: 'ok' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongo: mongoose.connection.readyState === 1 })
})

// API routes
app.use('/api/applications', require('./routes/applications'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/interviews', require('./routes/interviews'))
app.use('/api/followups', require('./routes/followups'))
app.use('/api/notifications', require('./routes/notifications'))
app.use('/api/documents', require('./routes/documents'))
app.use('/api/analytics', require('./routes/analytics'))
app.use('/api/profile', require('./routes/profile'))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
