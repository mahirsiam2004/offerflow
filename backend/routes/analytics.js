const express = require('express')
const { list } = require('../store')

const router = express.Router()

// Aggregate stats from in-memory applications.
router.get('/', (req, res) => {
  const apps = list('applications')
  const byStatus = {}
  for (const app of apps) {
    byStatus[app.status] = (byStatus[app.status] || 0) + 1
  }

  const stats = {
    totalApplications: apps.length,
    applied: byStatus['applied'] || 0,
    interviewing: (byStatus['interview-scheduled'] || 0) + (byStatus['interviewed'] || 0),
    rejected: byStatus['rejected'] || 0,
    offers: byStatus['offer-received'] || 0,
    hired: byStatus['hired'] || 0,
    byStatus,
  }

  const chartData = {
    labels: Object.keys(byStatus),
    datasets: [
      {
        label: 'Applications',
        data: Object.values(byStatus),
        backgroundColor: ['#2563EB', '#4F46E5', '#22C55E', '#F59E0B', '#EF4444'],
        borderColor: ['#1D4ED8', '#6D28D9', '#16A34A', '#D97706', '#B91C1C'],
      },
    ],
  }

  res.json({ stats, chartData })
})

module.exports = router
