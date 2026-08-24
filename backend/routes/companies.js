const express = require('express')
const { list, get, create, update, remove } = require('../store')

const router = express.Router()

router.get('/', (req, res) => res.json(list('companies')))
router.get('/:id', (req, res) => {
  const item = get('companies', req.params.id)
  if (!item) return res.status(404).json({ message: 'Company not found' })
  res.json(item)
})
router.post('/', (req, res) => {
  const item = create('companies', req.body || {}, 'comp')
  res.status(201).json(item)
})
router.patch('/:id', (req, res) => {
  const updated = update('companies', req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ message: 'Company not found' })
  res.json(updated)
})
router.delete('/:id', (req, res) => {
  const ok = remove('companies', req.params.id)
  if (!ok) return res.status(404).json({ message: 'Company not found' })
  res.json({ message: 'Company deleted' })
})

module.exports = router
