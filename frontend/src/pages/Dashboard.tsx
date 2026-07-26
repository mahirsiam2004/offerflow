import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { DashboardStats } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Mail, XCircle, Award, CheckCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get<DashboardStats>('/dashboard/stats')
      return response.data
    },
  })

  const { data: charts } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: async () => {
      const response = await api.get('/dashboard/charts')
      return response.data
    },
  })

  const statCards = [
    {
      title: 'Total Applications',
      value: stats?.totalApplications ?? 0,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      title: 'Applied',
      value: stats?.applied ?? 0,
      icon: Mail,
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
    {
      title: 'Interviewing',
      value: stats?.interviewing ?? 0,
      icon: TrendingUp,
      color: 'text-warning',
      bgColor: 'bg-warning/5',
    },
    {
      title: 'Rejected',
      value: stats?.rejected ?? 0,
      icon: XCircle,
      color: 'text-danger',
      bgColor: 'bg-danger/5',
    },
    {
      title: 'Offers',
      value: stats?.offers ?? 0,
      icon: Award,
      color: 'text-success',
      bgColor: 'bg-success/5',
    },
    {
      title: 'Hired',
      value: stats?.hired ?? 0,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ]

  const statusData = [
    { name: 'Applied', value: stats?.applied ?? 0 },
    { name: 'Interviewing', value: stats?.interviewing ?? 0 },
    { name: 'Offers', value: stats?.offers ?? 0 },
    { name: 'Rejected', value: stats?.rejected ?? 0 },
    { name: 'Hired', value: stats?.hired ?? 0 },
  ]

  const COLORS = ['#2563EB', '#4F46E5', '#22C55E', '#F59E0B', '#EF4444']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-600">Track your job application progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-card-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Software Engineer</p>
                        <p className="text-sm text-neutral-600">Tech Corp</p>
                        <p className="text-xs text-neutral-500">Applied 2 days ago</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-warning/10 text-warning">
                        Applied
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}