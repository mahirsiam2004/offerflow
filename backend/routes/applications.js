const express = require('express')
const { list, get, create, update, remove, genId } = require('../store')

const router = express.Router()

// GET /api/applications
router.get('/', (req, res) => {
  res.json(list('applications'))
})

// GET /api/applications/:id
router.get('/:id', (req, res) => {
  const item = get('applications', req.params.id)
  if (!item) return res.status(404).json({ message: 'Application not found' })
  res.json(item)
})

// POST /api/applications
router.post('/', (req, res) => {
  const data = req.body || {}
  const item = create('applications', data, 'app')
  res.status(201).json(item)
})

// PATCH /api/applications/:id
router.patch('/:id', (req, res) => {
  const updated = update('applications', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Application not found' })
  res.json(updated)
})

// DELETE /api/applications/:id
router.delete('/:id', (req, res) => {
  const ok = remove('applications', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Application not found' })
  res.json({ message: 'Application deleted' })
})

module.exports = router
