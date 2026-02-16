import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { BandsPage } from './pages/BandsPage'
import { ContactPage } from './pages/ContactPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderOnlinePage } from './pages/OrderOnlinePage'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
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
