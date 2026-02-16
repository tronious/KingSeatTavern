import { menu, type MenuItem, type MenuPrice } from '../data/menu'
import { useRef, useEffect, useState } from 'react'
import { setJumpTo } from '../store/menuNavSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatPrice(price?: MenuPrice) {
  if (!price) return null
  if (price.kind === 'market') return 'Market price'
  if (price.kind === 'single') return formatMoney(price.price.amount)
  return price.prices.map((p) => `${p.label}: ${formatMoney(p.price.amount)}`).join(' · ')
}

function MenuItemRow({ item }: { item: MenuItem }) {
  const priceText = formatPrice(item.price)

  return (
    <div className="menuItem">
      <div className="menuItem__top">
        <div className="menuItem__name">{item.name}</div>
        {priceText ? <div className="menuItem__price">{priceText}</div> : null}
      </div>
      {item.description ? <div className="menuItem__desc">{item.description}</div> : null}
      {item.notes?.length ? (
        <ul className="menuItem__notes">
          {item.notes.map((n, idx) => (
            <li key={idx}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function MenuPage() {
  const dispatch = useAppDispatch()
  const jumpTo = useAppSelector((s) => s.menuNav.jumpTo)
  const [didInit, setDidInit] = useState(false)

  const menuJumpSelect = useRef<HTMLSelectElement | null>(null)
  const menuStickyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (didInit) return
    setDidInit(true)
    if (jumpTo) return
    const firstId = menu.sections[0]?.id ?? ''
    if (firstId) dispatch(setJumpTo(firstId))
  }, [didInit, dispatch, jumpTo])

  useEffect(() => {
    const el = menuStickyRef.current
    if (!el) return

    const root = document.documentElement
    const set = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      root.style.setProperty('--menu-sticky-h', `${h}px`)
    }

    set()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => set())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function scrollIntoSection(sectionId: string) {
    const el = document.getElementById(sectionId)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (!jumpTo) return
    scrollIntoSection(jumpTo)
  }, [jumpTo])

  function handleMenuSectionChange() {
    const sect = menuJumpSelect.current?.value

    if (!sect) return
    dispatch(setJumpTo(sect))
    scrollIntoSection(sect)
  }

  return (
    <main className="menuPage">
      <div className="menuSticky" aria-label="Menu page header" ref={menuStickyRef}>
        <div className="container">
          <div className="menuHeader">
            <div>
              {/* <h1>Menu</h1> */}
              {/* <p className="muted">Tap a category to jump.</p> */}
            </div>
            <div className="menuHeader__meta muted">
              {menu.updatedAt ? `Updated ${menu.updatedAt}` : null}
            </div>
          </div>
        </div>

        <div className="menuNavBand"  style={{display:'flex', flexDirection: 'column', background:'white'}} aria-label="Menu categories">
          <div className="container">
            <div className="menuJump" aria-label="Jump to a menu section">
              <label className="menuJump__label" style={{color:'black'}} htmlFor="menuJump">
                Jump to:
              </label>
              <select ref={menuJumpSelect} className="menuJump__select" value={jumpTo} onChange={handleMenuSectionChange}>
                <option value="">Select a section…</option>
                {menu.sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <nav className="menuNav">
              {menu.sections.map((s) => (
                <a
                  key={s.id}
                  className="menuNav__chip"
                  href={`#${s.id}`}
                  onClick={() => dispatch(setJumpTo(s.id))}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="container">
        {menu.sections.map((section) => (
          <section key={section.id} id={section.id} className="menuSection">
            <div className="menuSection__header">
              <h2>{section.title}</h2>
              {section.note ? <p style={{background:'white', padding:'6px'}}>{section.note}</p> : null}
            </div>

            {section.items.length ? (
              <div className="menuSection__items">
                {section.items.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="card">
                <p className="muted" style={{ margin: 0 }}>
                  No items yet. Add items in <span className="link">src/data/menu.ts</span>.
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}
