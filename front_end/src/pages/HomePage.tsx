export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Irwin, Pennsylvania</p>
            <h1>King Seat Tavern</h1>
            <p className="lead">
              A clean, mobile-friendly site for the tavern — menu, online ordering,
              and live bands.
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="tel:7243927560">
                Call 724-392-7560
              </a>
              <a className="btn btn--ghost" href="https://maps.google.com/maps?ll=40.34576,-79.58429&z=14&t=m&hl=en-US&gl=US&mapclient=apiv3" target="_blank" rel="noreferrer">
                Get Directions
              </a>
            </div>

            <div className="meta">
              <div className="meta__item">
                <div className="meta__label">Address</div>
                <div className="meta__value">4022 Route 130, Irwin, PA 15642</div>
              </div>
              <div className="meta__item">
                <div className="meta__label">Hours</div>
                <div className="meta__value">Daily 10:00 AM – Late</div>
              </div>
            </div>
          </div>

          <div className="hero__card" role="note" aria-label="Quick links">
            <div className="card">
              <h2 className="card__title">Quick Links</h2>
              <p className="card__text">
                Jump straight to what you need.
              </p>
              <div className="hero__actions">
                <a className="btn btn--secondary" href="/menu">
                  View menu
                </a>
                <a className="btn btn--ghost" href="/order-online">
                  Order online
                </a>
                <a className="btn btn--ghost" href="/bands">
                  Bands
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
