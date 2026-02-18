import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/order-online', label: 'Order' },
  { to: '/events', label: 'Events' },
  { to: '/bands', label: 'Bands' },
] as const

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerId = useId()
  const closeBtnRef = useRef<HTMLAnchorElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const { pathname } = useLocation()

  const pageTitle = (() => {
    if (pathname === '/' || pathname === '') return 'HOME'
    if (pathname.startsWith('/menu')) return 'MENU'
    if (pathname.startsWith('/order-online')) return 'ORDER ONLINE'
    if (pathname.startsWith('/events')) return 'EVENTS'
    if (pathname.startsWith('/bands')) return 'BANDS'
    if (pathname.startsWith('/contact')) return 'CONTACT'
    return 'PAGE'
  })()

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const root = document.documentElement
    const set = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      root.style.setProperty('--nav-real-h', `${h}px`)
    }

    set()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => set())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    closeBtnRef.current?.focus()
  }, [drawerOpen])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = drawerOpen ? 'hidden' : prevOverflow
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [drawerOpen])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  return (
    <header className="nav" ref={headerRef}>
      <div className="container nav__inner">
        {/* <NavLink to="/" className="brand" aria-label="King Seat Tavern">
          <span className="brand__mark" aria-hidden="true">
            <img className="brand__logo" src={ksLogo} alt="" />
          </span>
          <span className="brand__text">King Seat Tavern</span>
        </NavLink> */}

        {/* <div className="nav__siteTitle nav__mobileOnly" aria-label="King Seat Tavern">
          KING SEAT TAVERN
        </div> */}

        <div className="nav__spacer nav__mobileOnly" aria-hidden="true" />

        <div className="nav__pageTitle nav__mobileOnly" aria-label={`Current page ${pageTitle}`}>
          {pageTitle}
        </div>

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

        <div className="nav__actions">
          {/* <a className="nav__cta" href="tel:7243927506">
            Call
          </a> */}

          <button
            type="button"
            className="nav__menuBtn"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <div className="navDrawer" id={drawerId}>
          <button
            type="button"
            className="navDrawer__backdrop"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="navDrawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="navDrawer__header">
              <div className="navDrawer__title">Menu</div>
              <a
                href="#"
                className="navDrawer__closeLink"
                onClick={(e) => {
                  e.preventDefault()
                  setDrawerOpen(false)
                }}
                ref={closeBtnRef}
              >
                Close
              </a>
            </div>

            <nav className="navDrawer__links" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `navDrawer__link${isActive ? ' navDrawer__link--active' : ''}`
                  }
                  end={item.to === '/'}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <a className="navDrawer__cta" href="tel:7243927506" onClick={() => setDrawerOpen(false)}>
              Call 724-392-7506
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
