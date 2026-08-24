import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun, Bell, Shield, Database, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailReminders, setEmailReminders] = useState(true)

  const handleToggle = (setting: string, value: boolean) => {
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-neutral-600">Configure your OfferFlow preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-sm text-neutral-600">Enable dark mode for better viewing</p>
              </div>
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Switch
                  checked={darkMode}
                  onCheckedChange={(value) => {
                    setDarkMode(value)
                    handleToggle('Dark Mode', value)
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Push Notifications</label>
                <p className="text-sm text-neutral-600">Receive notifications for interview updates</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={(value) => {
                  setNotifications(value)
                  handleToggle('Notifications', value)
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Email Reminders</label>
                <p className="text-sm text-neutral-600">Get email reminders for deadlines</p>
              </div>
              <Switch
                checked={emailReminders}
                onCheckedChange={(value) => {
                  setEmailReminders(value)
                  handleToggle('Email Reminders', value)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Connected Accounts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Export Data (CSV)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Resume
              </Button>
              <Button variant="outline" className="w-full justify-start text-danger">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-neutral-600">
              <p>OfferFlow v1.0.0</p>
              <p className="mt-2">A job application tracker built for professionals</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}