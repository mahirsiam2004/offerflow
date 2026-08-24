import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Notification } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle, AlertCircle, Info, CheckCircle as CheckCircleIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, createElement } from 'react'

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', filter],
    queryFn: async () => {
      const response = await api.get<Notification[]>(`/notifications${filter === 'unread' ? '?unread=true' : ''}`)
      return response.data
    },
  })

  const getNotificationIcon = (type: string) => {
    const icons = {
      info: Info,
      warning: AlertCircle,
      success: CheckCircleIcon,
      error: AlertCircle
    }
    return icons[type] || Bell
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      info: 'text-blue-500',
      warning: 'text-yellow-500',
      success: 'text-green-500',
      error: 'text-red-500'
    }
    return colors[type] || 'text-blue-500'
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading notifications...</div>
  }

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-neutral-600">Stay updated with your job search progress</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({notifications?.length ?? 0})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Unread
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('read')}
        >
          Read
        </Button>
      </div>

      {filteredNotifications && filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-neutral-600">
              {filter === 'all' 
                ? 'You have no notifications yet'
                : `You have no ${filter} notifications`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications?.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 ${
                notification.read ? 'bg-white' : 'bg-primary/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  {createElement(getNotificationIcon(notification.type), { className: "h-5 w-5" })}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${
                      notification.read ? '' : 'text-primary'
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}