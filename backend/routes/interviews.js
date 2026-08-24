const express = require('express')
const { list, get, create, update, remove } = require('../store')

const router = express.Router()

router.get('/', (req, res) => res.json(list('interviews')))
router.get('/:id', (req, res) => {
  const item = get('interviews', req.params.id)
  if (!item) return res.status(404).json({ message: 'Interview not found' })
  res.json(item)
})
router.post('/', (req, res) => {
  const item = create('interviews', req.body || {}, 'int')
  res.status(201).json(item)
})
router.patch('/:id', (req, res) => {
  const updated = update('interviews', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Interview not found' })
  res.json(updated)
})
router.delete('/:id', (req, res) => {
  const ok = remove('interviews', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Interview not found' })
  res.json({ message: 'Interview deleted' })
})

module.exports = router
