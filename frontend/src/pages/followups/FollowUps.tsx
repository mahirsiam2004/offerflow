import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { FollowUp } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Mail, MessageSquare, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function FollowUps() {
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: followUps, isLoading } = useQuery({
    queryKey: ['followups'],
    queryFn: async () => {
      const response = await api.get<FollowUp[]>('/followups')
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/followups/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followups'])
      toast.success('Follow-up deleted')
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this follow-up?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading follow-ups...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Follow-ups</h1>
          <p className="text-neutral-600">Track your follow-up communications</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Follow-up
        </Button>
      </div>

      {followUps && followUps.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No follow-ups yet</h3>
            <p className="text-neutral-600 mb-4">Track your follow-up communications here</p>
            <Button onClick={() => setShowForm(true)}>
              Add First Follow-up
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {followUps?.map((followUp, index) => (
            <motion.div
              key={followUp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{followUp.subject || 'Follow-up'}</CardTitle>
                  <p className="text-sm text-neutral-600">
                    {new Date(followUp.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Type: {followUp.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Status: {followUp.status}</span>
                    </div>
                  </div>
                  {followUp.content && (
                    <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                      <p className="text-sm line-clamp-3">{followUp.content}</p>
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
                      onClick={() => handleDelete(followUp.id)}
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