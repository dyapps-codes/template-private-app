export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Private App',
  homePath: '/dashboard',
  loginPath: '/login',
  forgotPasswordPath: '/forgot-password',
  passwordRecoveryPath: '/reset-password',
  adminUsersPath: '/admin/users',
}
