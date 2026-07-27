import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Application } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

const applicationSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  companyId: z.string().min(1, 'Company is required'),
  employmentType: z.enum(['full-time', 'part-time', 'internship', 'contract']),
  workLocation: z.enum(['remote', 'hybrid', 'onsite']),
  salary: z.number().optional().nullable(),
  applicationLink: z.string().url().optional().nullable(),
  applicationDate: z.string().min(1, 'Application date is required'),
  deadline: z.string().optional().nullable(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum([
    'saved', 'applied', 'under-review', 'interview-scheduled',
    'interviewed', 'offer-received', 'rejected', 'hired', 'archived'
  ]),
  notes: z.string().optional(),
  tags: z.string().optional(),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function ApplicationEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: application, isLoading } = useQuery({
    queryKey: ['applications', id],
    queryFn: async () => {
      const response = await api.get<Application>(`/applications/${id}`)
      return response.data
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      await api.patch(`/applications/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['applications'])
      toast.success('Application updated')
      navigate('/applications')
    },
  })

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: application,
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading application...</div>
  }

  if (!application) {
    return <div className="text-center py-8">Application not found</div>
  }

  const onSubmit = (data: ApplicationFormData) => {
    updateMutation.mutate(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Link to="/applications">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Edit Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Position</label>
                  <Input
                    {...register('position')}
                    defaultValue={application.position}
                    error={errors.position?.message}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input
                    {...register('companyId')}
                    defaultValue={application.companyId}
                    error={errors.companyId?.message}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Employment Type</label>
                  <Select
                    value={watch('employmentType')}
                    onValueChange={(value) => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Work Location</label>
                  <Select
                    value={watch('workLocation')}
                    onValueChange={(value) => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={watch('status')}
                    onValueChange={(value) => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saved">Saved</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="offer-received">Offer Received</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select
                    value={watch('priority')}
                    onValueChange={(value) => {}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}