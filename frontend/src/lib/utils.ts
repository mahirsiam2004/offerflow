import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'saved': 'bg-neutral-100 text-neutral-800',
    'applied': 'bg-primary/10 text-primary',
    'under-review': 'bg-warning/10 text-warning',
    'interview-scheduled': 'bg-secondary/10 text-secondary',
    'interviewed': 'bg-info/10 text-info',
    'offer-received': 'bg-success/10 text-success',
    'rejected': 'bg-danger/10 text-danger',
    'hired': 'bg-success/20 text-success',
    'archived': 'bg-neutral-200 text-neutral-600',
  }
  return statusColors[status] || 'bg-neutral-100 text-neutral-800'
}

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'saved': 'Saved',
    'applied': 'Applied',
    'under-review': 'Under Review',
    'interview-scheduled': 'Interview Scheduled',
    'interviewed': 'Interviewed',
    'offer-received': 'Offer Received',
    'rejected': 'Rejected',
    'hired': 'Hired',
    'archived': 'Archived',
  }
  return statusLabels[status] || status
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    'low': 'bg-neutral-100 text-neutral-600',
    'medium': 'bg-warning/10 text-warning',
    'high': 'bg-danger/10 text-danger',
  }
  return priorityColors[priority] || 'bg-neutral-100 text-neutral-600'
}

export function getWorkLocationColor(location: string): string {
  const locationColors: Record<string, string> = {
    'remote': 'bg-success/10 text-success',
    'hybrid': 'bg-secondary/10 text-secondary',
    'onsite': 'bg-primary/10 text-primary',
  }
  return locationColors[location] || 'bg-neutral-100 text-neutral-600'
}

export function getWorkLocationLabel(location: string): string {
  const locationLabels: Record<string, string> = {
    'remote': 'Remote',
    'hybrid': 'Hybrid',
    'onsite': 'On-site',
  }
  return locationLabels[location] || location
}

export function getEmploymentTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'internship': 'Internship',
    'contract': 'Contract',
  }
  return typeLabels[type] || type
}

export function getInterviewTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    'phone': 'Phone',
    'video': 'Video Call',
    'onsite': 'On-site',
    'technical': 'Technical',
    'behavioral': 'Behavioral',
  }
  return typeLabels[type] || type
}

export function getInterviewStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'scheduled': 'Scheduled',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'rescheduled': 'Rescheduled',
  }
  return statusLabels[status] || status
}

export function getInterviewStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'scheduled': 'bg-warning/10 text-warning',
    'completed': 'bg-success/10 text-success',
    'cancelled': 'bg-danger/10 text-danger',
    'rescheduled': 'bg-secondary/10 text-secondary',
  }
  return statusColors[status] || 'bg-neutral-100 text-neutral-600'
}