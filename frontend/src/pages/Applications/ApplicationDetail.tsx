import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Application } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Calendar, MapPin, DollarSign, ExternalLink, FileText } from 'lucide-react'

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: application, isLoading } = useQuery({
    queryKey: ['applications', id],
    queryFn: async () => {
      const response = await api.get<Application>(`/applications/${id}`)
      return response.data
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!application) {
    return <div className="text-center py-8">Application not found</div>
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
        <Link to={`/applications/edit/${id}`}>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Application
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{application.position}</h2>
              <p className="text-neutral-600">{application.companyId}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-neutral-500" />
                <span>Applied: {new Date(application.applicationDate).toLocaleDateString()}</span>
              </div>
              
              {application.deadline && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                </div>
              )}
              
              {application.workLocation && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                  <span>{application.workLocation}</span>
                </div>
              )}
              
              {application.salary && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-neutral-500" />
                  <span>Salary: ${application.salary.toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-neutral-600">Status</span>
              <span className="block font-medium mt-1">{application.status}</span>
            </div>
            
            {application.tags && application.tags.length > 0 && (
              <div>
                <span className="text-sm text-neutral-600">Tags</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {application.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-neutral-100 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {application.applicationLink && (
              <a 
                href={application.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View Application Link
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}