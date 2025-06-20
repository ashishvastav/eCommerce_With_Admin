import React from 'react'
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='hidden lg:flex w-1/2 bg-gray-100 items-center justify-center'>
        <div className='max-w-md space-y-6 text-center text-primary-foreground'>
          <h1 className='text-4xl font-bold'>Welcome to eCommerce Shopping</h1>
        </div>
      </div>
      <div className='flex-1 flex items-center justify-center bg-white'>
        <div className='max-w-md w-full space-y-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;