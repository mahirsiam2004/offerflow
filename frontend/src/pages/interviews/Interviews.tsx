import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Interview } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Calendar, Clock, Video, Phone, MapPin, Code, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function Interviews() {
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const response = await api.get<Interview[]>('/interviews')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/interviews/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] })
      toast.success('Interview deleted')
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      deleteMutation.mutate(id)
    }
  }

  const getInterviewTypeIcon = (type: string) => {
    const icons = {
      phone: Phone,
      video: Video,
      onsite: MapPin,
      technical: Code,
      behavioral: Brain
    }
    return icons[type] || Calendar
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading interviews...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-neutral-600">Schedule and track your interviews</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {interviews && interviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No interviews scheduled</h3>
            <p className="text-neutral-600 mb-4">Schedule your first interview to get started</p>
            <Button onClick={() => setShowForm(true)}>
              Schedule Interview
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interviews?.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{interview.interviewer || 'Interview'}</CardTitle>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary">
                      {interview.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {new Date(interview.date).toLocaleDateString()} at {interview.time}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>{interview.type}</span>
                    </div>
                  </div>
                  {interview.location && (
                    <div className="mt-2 text-sm text-neutral-600">
                      {interview.location}
                    </div>
                  )}
                </CardContent>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(interview.id)}
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