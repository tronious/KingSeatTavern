import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { BandsPage } from './pages/BandsPage'
import { ContactPage } from './pages/ContactPage'
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
        <Route path="/bands" element={<BandsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/** Compatibility routes with current live-site URLs */}
        <Route path="/menu-1" element={<Navigate to="/menu" replace />} />
        <Route path="/calendar" element={<Navigate to="/bands" replace />} />
        <Route path="/events" element={<Navigate to="/bands" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="muted">4022 Route 130, Irwin, PA 15642</div>
          <div className="footer__right">
            <a className="link" href="tel:7243927560">
              724-392-7560
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
