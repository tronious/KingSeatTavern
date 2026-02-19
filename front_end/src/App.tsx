import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { BandsPage } from './pages/BandsPage'
import { ContactPage } from './pages/ContactPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { MobileBarPage } from './pages/MobileBar'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderOnlinePage } from './pages/OrderOnlinePage'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  // Only react to actual route changes (pathname), not hash updates.
  // Keeps Menu in-page section jumps working.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <div className="app">
      <ScrollToTopOnRouteChange />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mobile-bar" element={<MobileBarPage />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/bands" element={<BandsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/** Compatibility routes with current live-site URLs */}
        <Route path="/menu-1" element={<Navigate to="/menu" replace />} />
        <Route path="/calendar" element={<Navigate to="/events" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
