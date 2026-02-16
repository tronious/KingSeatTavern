import { menu, type MenuItem, type MenuPrice } from '../data/menu'

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
  return (
    <main className="section">
      <div className="menuSticky" aria-label="Menu page header">
        <div className="container">
          <div className="menuHeader">
            <div>
              <h1>Menu</h1>
              {/* <p className="muted">Tap a category to jump.</p> */}
            </div>
            <div className="menuHeader__meta muted">
              {menu.updatedAt ? `Updated ${menu.updatedAt}` : null}
            </div>
          </div>
        </div>

        <div className="menuNavBand" aria-label="Menu categories">
          <div className="container">
            <nav className="menuNav">
              {menu.sections.map((s) => (
                <a key={s.id} className="menuNav__chip" href={`#${s.id}`}>
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
              {section.note ? <p className="muted">{section.note}</p> : null}
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
