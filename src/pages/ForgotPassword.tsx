import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'
import { useAuth } from '@dypai-ai/client-sdk/react'
import { toast } from 'sonner'

export function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Enter your email address')
      return
    }
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) {
      toast.error(error.message ?? 'Could not send reset email')
      return
    }
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        {!sent ? (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
              <Mail className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                We sent a reset link to <span className="font-medium text-foreground">{email}</span>.
                Check your spam folder if you don't see it.
              </p>
            </div>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-primary hover:underline"
            >
              Resend email
            </button>
          </div>
        )}

        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
