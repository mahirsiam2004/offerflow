const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    required: true,
  },
  workLocation: {
    type: String,
    enum: ['remote', 'hybrid', 'onsite'],
    required: true,
  },
  salary: {
    type: Number,
  },
  applicationLink: {
    type: String,
  },
  applicationDate: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: [
      'saved', 'applied', 'under-review', 'interview-scheduled',
      'interviewed', 'offer-received', 'rejected', 'hired', 'archived'
    ],
    default: 'saved',
  },
  resumeUrl: {
    type: String,
  },
  coverLetterUrl: {
    type: String,
  },
  notes: {
    type: String,
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
})

module.exports = mongoose.model('Application', applicationSchema)