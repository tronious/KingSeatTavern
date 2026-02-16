export function ContactPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Contact</h1>
        <p className="muted">
          Scaffold page. Next step: build a real contact form that POSTs to your
          ASP.NET API (with optional file upload) and add an embedded map.
        </p>

        <div className="grid grid--two">
          <div className="card">
            <h2 className="card__title">Call</h2>
            <p className="card__text">
              <a className="link" href="tel:7243927560">
                724-392-7560
              </a>
            </p>
          </div>

          <div className="card">
            <h2 className="card__title">Visit</h2>
            <p className="card__text">4022 Route 130, Irwin, PA 15642</p>
            <a
              className="btn btn--ghost"
              href="https://maps.google.com/maps?ll=40.34576,-79.58429&z=14&t=m&hl=en-US&gl=US&mapclient=apiv3"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
