import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Settings, 
  User,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Applications', href: '/applications', icon: Briefcase },
  { name: 'Interviews', href: '/interviews', icon: Calendar },
  { name: 'Follow-ups', href: '/follow-ups', icon: MessageSquare },
  { name: 'Companies', href: '/companies', icon: Users },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const location = useLocation()

  return (
    <div className={cn('hidden md:flex flex-col w-64 bg-surface border-r border-neutral-100 h-screen', className)}>
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">OF</span>
          </div>
          <span className="font-semibold text-lg gradient-primary-text">OfferFlow</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <div className="border-t border-neutral-100 pt-4">
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            <User className="h-5 w-5" />
            Account
          </Link>
        </div>
      </div>
    </div>
  )
}