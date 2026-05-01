import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@dypai-ai/client-sdk/react'
import { toast } from 'sonner'

export function ResetPassword() {
  const navigate = useNavigate()
  const { setPassword: doSetPassword, isAuthenticated, authEvent } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [validSession, setValidSession] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (authEvent === 'PASSWORD_RECOVERY' || isAuthenticated) {
      setValidSession(true)
    }
    setChecking(false)
  }, [authEvent, isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || !confirm) {
      toast.error('Please fill in all fields')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    const { error } = await doSetPassword(password)
    setLoading(false)
    if (error) {
      toast.error(error.message ?? 'Could not update password')
      return
    }
    toast.success('Password updated successfully')
    navigate('/')
  }

  if (checking) return null

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength]
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'][strength]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        {!validSession ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Link expired</h1>
            <p className="text-sm text-muted-foreground">
              This reset link is invalid or has expired. Please request a new one.
            </p>
            <Link to="/forgot-password">
              <Button className="w-full">Request new link</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
              <p className="text-sm text-muted-foreground">Choose a strong password for your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">New password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={show ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-muted'}`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-600'}`}>
                      {strengthLabel}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="text-sm font-medium">Confirm password</label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                {confirm.length > 0 && password !== confirm && (
                  <p className="text-xs text-destructive">Passwords do not match</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</>
                ) : (
                  'Update password'
                )}
              </Button>
            </form>
          </>
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
