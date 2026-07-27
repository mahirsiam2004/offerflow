import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const response = await api.get('/interviews')
      return response.data
    },
  })

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = []
    const firstDay = new Date(year, month, 1).getDay()
    const lastDay = new Date(year, month + 1, 0).getDate()
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const eventsForDay = (day: Date) => {
    if (!interviews) return []
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date)
      return interviewDate.toDateString() === day.toDateString()
    })
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading calendar...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-neutral-600">View your scheduled interviews</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-lg overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-neutral-100 p-2 text-center font-semibold">
                  {day}
                </div>
              ))}
              
              {daysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] bg-white p-2 border-t border-x ${
                    day ? 'border-b' : 'border-b-0 bg-neutral-50'
                  }`}
                >
                  {day && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium">{day.getDate()}</div>
                      {eventsForDay(day).map(event => (
                        <div
                          key={event.id}
                          className="text-xs bg-primary/10 text-primary rounded px-1 py-0.5"
                        >
                          {event.time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews && interviews.length > 0 ? (
              interviews
                .filter(i => new Date(i.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(interview => (
                  <div key={interview.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{interview.interviewer}</h3>
                        <p className="text-sm text-neutral-600">
                          {new Date(interview.date).toLocaleDateString()} at {interview.time}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary">
                        {interview.type}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-neutral-600 text-center py-4">No upcoming interviews</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}