import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children, isLoading}) {
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>
  }

//    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
//         return <Navigate to="/auth/login" state={{ from: location }} replace />
//    }
   if (!isAuthenticated && (location.pathname.includes('/shop/checkout'))) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
   }
  
 
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    if (user && user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }else if (user && user?.role === 'user') {
      return <Navigate to="/shop/home" replace />
    } else {
      return <Navigate to="/auth/login" replace />
    }
  }

  if( isAuthenticated && user && user?.role !== 'admin' && location.pathname.includes('admin')) {
    return <Navigate to="/unauthorized" replace />
  }
  if( isAuthenticated && user && user?.role === 'admin' && location.pathname.includes('shop')) {
    return <Navigate to="/admin/dashboard" replace />
  }
  return <>{children}</>;
}

export default CheckAuth;