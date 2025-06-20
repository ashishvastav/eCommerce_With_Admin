import ShoppingHeader from '@/pages/shopping-view/header';
import React from 'react'
import { Outlet } from 'react-router-dom';

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        {/* common Header component */}
        <ShoppingHeader />
        <main className="flex-1 flex p-4 bg-muted/40 md:p-6 lg:p-8">
        <Outlet />
        </main>
        {/* common Footer component */}
        <footer>Footer</footer>
    </div>
  )
}

export default ShoppingLayout;