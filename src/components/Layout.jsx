import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 flex gap-8">
        <main className="flex-1">
          <Outlet />
        </main>
        <Sidebar className="w-80 hidden lg:block" />
      </div>
      <Footer />
    </div>
  )
}

export default Layout