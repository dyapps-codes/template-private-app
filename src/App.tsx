import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { DypaiProvider, ProtectedRoute } from '@dypai-ai/client-sdk/react'
import { Loader2 } from 'lucide-react'
import { dypai } from '@/lib/dypai'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { Login } from './pages/Login'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

const queryClient = new QueryClient()

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}

const App = () => (
  <DypaiProvider client={dypai}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ── Public routes ── */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ── Protected routes ── wrap any private page inside here */}
            <Route
              element={
                <ProtectedRoute
                  loadingComponent={<LoadingScreen />}
                  unauthenticatedComponent={<Navigate to="/login" replace />}
                >
                  <Outlet />
                </ProtectedRoute>
              }
            >
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* ADD ALL PRIVATE ROUTES HERE */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </DypaiProvider>
)

export default App
