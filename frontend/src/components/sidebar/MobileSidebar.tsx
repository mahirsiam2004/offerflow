import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
  X
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

interface MobileSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MobileSidebar({ open, setOpen }: MobileSidebarProps) {
  const location = useLocation()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="button" className="relative z-50 md:hidden" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-surface">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <Dialog.Panel className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">OF</span>
                  </div>
                  <span className="font-semibold text-lg gradient-primary-text">OfferFlow</span>
                </Link>
                <button
                  type="button"
                  className="rounded-lg p-2 hover:bg-neutral-100"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-2 py-4">
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
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}