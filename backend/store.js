// Shared in-memory data store.
// Used as a fallback when MongoDB is unavailable so the API stays runnable
// end-to-end without a live database connection.
let seq = 1
const genId = (prefix) => `${prefix}_${seq++}`

const store = {
  applications: [
    {
      id: genId('app'),
      companyId: 'comp_1',
      position: 'Frontend Engineer',
      employmentType: 'full-time',
      workLocation: 'remote',
      salary: 85000,
      applicationLink: 'https://example.com/apply',
      applicationDate: '2026-08-01',
      deadline: '2026-09-01',
      priority: 'high',
      status: 'interview-scheduled',
      notes: 'Referred by a friend.',
      tags: ['react', 'typescript'],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-10T10:00:00.000Z',
    },
  ],
  companies: [
    {
      id: 'comp_1',
      name: 'Acme Corp',
      website: 'https://acme.example.com',
      industry: 'Technology',
      location: 'Remote',
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
  ],
  interviews: [
    {
      id: genId('int'),
      applicationId: 'app_1',
      date: '2026-08-20',
      time: '14:00',
      type: 'technical',
      interviewer: 'Jane Doe',
      notes: 'System design round.',
      status: 'scheduled',
      createdAt: '2026-08-10T10:00:00.000Z',
      updatedAt: '2026-08-10T10:00:00.000Z',
    },
  ],
  followups: [
    {
      id: genId('fu'),
      applicationId: 'app_1',
      date: '2026-08-15',
      type: 'email',
      subject: 'Follow up on application',
      content: 'Polite check-in email.',
      response: '',
      status: 'pending',
      createdAt: '2026-08-10T10:00:00.000Z',
      updatedAt: '2026-08-10T10:00:00.000Z',
    },
  ],
  notifications: [
    {
      id: genId('ntf'),
      userId: 'local',
      title: 'Interview scheduled',
      message: 'You have an interview on 2026-08-20.',
      type: 'info',
      read: false,
      createdAt: '2026-08-10T10:00:00.000Z',
    },
  ],
  documents: [
    {
      id: genId('doc'),
      userId: 'local',
      name: 'Resume 2026.pdf',
      url: 'https://example.com/resume.pdf',
      type: 'resume',
      size: 245760,
      uploadedAt: '2026-08-01T10:00:00.000Z',
    },
  ],
}

const clone = (obj) => JSON.parse(JSON.stringify(obj))

function list(resource) {
  return clone(store[resource])
}

function get(resource, id) {
  const item = store[resource].find((x) => x.id === id)
  return item ? clone(item) : null
}

function create(resource, data, prefix) {
  const now = new Date().toISOString()
  const item = { id: genId(prefix), ...data, createdAt: now, updatedAt: now }
  store[resource].push(item)
  return clone(item)
}

function update(resource, id, data) {
  const idx = store[resource].findIndex((x) => x.id === id)
  if (idx === -1) return null
  store[resource][idx] = {
    ...store[resource][idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  }
  return clone(store[resource][idx])
}

function remove(resource, id) {
  const idx = store[resource].findIndex((x) => x.id === id)
  if (idx === -1) return false
  store[resource].splice(idx, 1)
  return true
}

module.exports = { store, list, get, create, update, remove, genId }
