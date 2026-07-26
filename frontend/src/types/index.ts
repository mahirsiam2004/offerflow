export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: string
  lastLogin: string
}

export type ApplicationStatus = 
  | 'saved'
  | 'applied'
  | 'under-review'
  | 'interview-scheduled'
  | 'interviewed'
  | 'offer-received'
  | 'rejected'
  | 'hired'
  | 'archived'

export interface Application {
  id: string
  companyId: string
  position: string
  employmentType: 'full-time' | 'part-time' | 'internship' | 'contract'
  workLocation: 'remote' | 'hybrid' | 'onsite'
  salary?: number
  applicationLink?: string
  applicationDate: string
  deadline?: string
  priority: 'low' | 'medium' | 'high'
  status: ApplicationStatus
  resumeUrl?: string
  coverLetterUrl?: string
  notes?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Company {
  id: string
  name: string
  logoUrl?: string
  website?: string
  industry?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export interface Interview {
  id: string
  applicationId: string
  date: string
  time: string
  location?: string
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral'
  interviewer?: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  createdAt: string
  updatedAt: string
}

export interface FollowUp {
  id: string
  applicationId: string
  date: string
  type: 'email' | 'call' | 'linkedin' | 'other'
  subject?: string
  content: string
  response?: string
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  userId: string
  name: string
  url: string
  type: 'resume' | 'cover-letter' | 'other'
  size: number
  uploadedAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  createdAt: string
}

export interface DashboardStats {
  totalApplications: number
  applied: number
  interviewing: number
  rejected: number
  offers: number
  hired: number
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
  }>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}