import { NavLink } from 'react-router-dom'
import ksLogo from '../assets/KSLogo.jpg'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/order-online', label: 'Order Online' },
  { to: '/bands', label: 'Bands' },
] as const

export function NavBar() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <NavLink to="/" className="brand" aria-label="King Seat Tavern">
          <span className="brand__mark" aria-hidden="true">
            <img className="brand__logo" src={ksLogo} alt="" />
          </span>
          <span className="brand__text">King Seat Tavern</span>
        </NavLink>

        <nav className="nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className="nav__cta" href="tel:7243927560">
          Call
        </a>
      </div>
    </header>
  )
}
