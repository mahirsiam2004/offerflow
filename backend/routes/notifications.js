const express = require('express')
const { list, get, create, update, remove } = require('../store')

const router = express.Router()

router.get('/', (req, res) => {
  const items = list('notifications')
  // Optional ?filter=unread|read
  const filter = req.query.filter
  if (filter === 'unread') return res.json(items.filter((n) => !n.read))
  if (filter === 'read') return res.json(items.filter((n) => n.read))
  res.json(items)
})
router.get('/:id', (req, res) => {
  const item = get('notifications', req.params.id)
  if (!item) return res.status(404).json({ message: 'Notification not found' })
  res.json(item)
})
router.post('/', (req, res) => {
  const item = create('notifications', req.body || {}, 'ntf')
  res.status(201).json(item)
})
router.patch('/:id', (req, res) => {
  const updated = update('notifications', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Notification not found' })
  res.json(updated)
})
router.delete('/:id', (req, res) => {
  const ok = remove('notifications', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Notification not found' })
  res.json({ message: 'Notification deleted' })
})

module.exports = router
