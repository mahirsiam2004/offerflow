const express = require('express')
const { list, get, create, update, remove } = require('../store')

const router = express.Router()

router.get('/', (req, res) => res.json(list('followups')))
router.get('/:id', (req, res) => {
  const item = get('followups', req.params.id)
  if (!item) return res.status(404).json({ message: 'Follow-up not found' })
  res.json(item)
})
router.post('/', (req, res) => {
  const item = create('followups', req.body || {}, 'fu')
  res.status(201).json(item)
})
router.patch('/:id', (req, res) => {
  const updated = update('followups', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Follow-up not found' })
  res.json(updated)
})
router.delete('/:id', (req, res) => {
  const ok = remove('followups', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Follow-up not found' })
  res.json({ message: 'Follow-up deleted' })
})

module.exports = router
