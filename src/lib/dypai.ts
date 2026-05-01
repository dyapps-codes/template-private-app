/// <reference types="vite/client" />
import { createClient } from '@dypai-ai/client-sdk'

export const dypai = createClient(import.meta.env.VITE_DYPAI_URL, {
  redirects: {
    passwordRecovery: '/reset-password',
    signIn: '/',
  },
})
