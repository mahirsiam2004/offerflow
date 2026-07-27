import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Application } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ExternalLink, FileText, Calendar, User, MapPin, DollarSign, Tag, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function Applications() {
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await api.get<Application[]>('/applications')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/applications/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['applications'])
      toast.success('Application deleted')
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading applications...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-neutral-600">Track all your job applications</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {applications && applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
            <p className="text-neutral-600 mb-4">Start tracking your job search today</p>
            <Button onClick={() => setShowForm(true)}>
              Add First Application
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications?.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{app.position}</CardTitle>
                  <div className="text-sm text-neutral-600">
                    {app.companyId} • Applied {new Date(app.applicationDate).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {app.status}
                    </span>
                    {app.priority && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-warning/10 text-warning">
                        {app.priority}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-neutral-600">
                    {app.applicationLink && (
                      <a href={app.applicationLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                        Application Link
                      </a>
                    )}
                    {app.deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Deadline: {new Date(app.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/applications/${app.id}`} target="_blank">
                        View
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/applications/edit/${app.id}`}>
                        <Edit className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(app.id)}
                      disabled={deleteMutation.mutate}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}