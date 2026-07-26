import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="gradient-primary-text">OfferFlow</span>
        </h1>
        <p className="text-lg text-neutral-600 mb-6">
          A modern job application tracker for students, graduates, and professionals
        </p>
        <Link to="/login">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-surface rounded-xl shadow-card">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">1</span>
          </div>
          <h3 className="font-semibold mb-2">Track Applications</h3>
          <p className="text-neutral-600">
            Keep track of all your job applications in one centralized dashboard
          </p>
        </div>

        <div className="text-center p-6 bg-surface rounded-xl shadow-card">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">2</span>
          </div>
          <h3 className="font-semibold mb-2">Schedule Interviews</h3>
          <p className="text-neutral-600">
            Never miss an interview with our built-in calendar and reminders
          </p>
        </div>

        <div className="text-center p-6 bg-surface rounded-xl shadow-card">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">3</span>
          </div>
          <h3 className="font-semibold mb-2">Analytics & Insights</h3>
          <p className="text-neutral-600">
            Understand your job search patterns with detailed analytics
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-neutral-600 mb-4">
          Already have an account?
        </p>
        <Link to="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </div>
    </div>
  )
}