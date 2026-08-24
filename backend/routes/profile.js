const express = require('express')

const router = express.Router()

// Simple local profile endpoint (no auth required in fallback mode).
router.get('/', (req, res) => {
  res.json({
    id: 'local',
    email: 'demo@offerflow.app',
    displayName: 'Demo User',
    photoURL: '',
    createdAt: '2026-08-01T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  })
})

router.patch('/', (req, res) => {
  res.json({
    id: 'local',
    email: 'demo@offerflow.app',
    displayName: req.body?.displayName || 'Demo User',
    photoURL: req.body?.photoURL || '',
    createdAt: '2026-08-01T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  })
})

module.exports = router
