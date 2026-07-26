import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
      setMessage('Password reset email sent! Check your inbox.')
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
        <p className="text-neutral-600">Enter your email to reset your password</p>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger-foreground p-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {sent && (
        <div className="bg-success/10 border border-success/20 text-success-foreground p-3 rounded-lg mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {message}
        </div>
      )}

      {!sent && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending reset email...
              </>
            ) : (
              'Send Reset Email'
            )}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-neutral-600">
          Remember your password?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}