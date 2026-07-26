import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { PublicRoute } from '@/routes/PublicRoute'

// Public routes
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import About from '@/pages/About'

// Protected routes
import Dashboard from '@/pages/Dashboard'
import Applications from '@/pages/applications/Applications'
import ApplicationDetail from '@/pages/applications/ApplicationDetail'
import ApplicationEdit from '@/pages/applications/ApplicationEdit'
import Interviews from '@/pages/interviews/Interviews'
import FollowUps from '@/pages/followups/FollowUps'
import Companies from '@/pages/companies/Companies'
import Documents from '@/pages/documents/Documents'
import Calendar from '@/pages/calendar/Calendar'
import Analytics from '@/pages/analytics/Analytics'
import Profile from '@/pages/profile/Profile'
import Settings from '@/pages/settings/Settings'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="applications/:id" element={<ApplicationDetail />} />
              <Route path="applications/edit/:id" element={<ApplicationEdit />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="follow-ups" element={<FollowUps />} />
              <Route path="companies" element={<Companies />} />
              <Route path="documents" element={<Documents />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App