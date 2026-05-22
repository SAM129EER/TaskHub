import React from 'react'
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
  <main className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
  <Outlet />
</main>
  )
}

export default AuthLayout
