import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar';
import AdminHeader from './header';

function AdminLayout() {
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSidebar />
     <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        {/* main content area */}
        <main className='flex-1 flex p-4 bg-muted/40 md:p-6 lg:p-8'>
            <Outlet />
        </main>
     </div>
    </div>
  )
}

export default AdminLayout;