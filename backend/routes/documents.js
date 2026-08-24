const express = require('express')
const { list, get, create, update, remove } = require('../store')

const router = express.Router()

router.get('/', (req, res) => res.json(list('documents')))
router.get('/:id', (req, res) => {
  const item = get('documents', req.params.id)
  if (!item) return res.status(404).json({ message: 'Document not found' })
  res.json(item)
})
router.post('/', (req, res) => {
  const item = create('documents', req.body || {}, 'doc')
  res.status(201).json(item)
})
router.patch('/:id', (req, res) => {
  const updated = update('documents', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Document not found' })
  res.json(updated)
})
router.delete('/:id', (req, res) => {
  const ok = remove('documents', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Document not found' })
  res.json({ message: 'Document deleted' })
})

module.exports = router
