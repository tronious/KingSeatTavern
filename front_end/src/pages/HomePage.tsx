import { homeEvents } from '../data/events'

function formatEventDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function HomePage() {
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61554632729226'
  const facebookPluginSrc =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(facebookPageUrl)}` +
    '&tabs=timeline' +
    '&width=500' +
    '&height=650' +
    '&small_header=true' +
    '&adapt_container_width=true' +
    '&hide_cover=false' +
    '&show_facepile=false'

  return (
    <main>
      <section className="hero">
        <div className="container hero__inner">
          {/* <div className="hero__copy">
            <p className="eyebrow">Irwin, Pennsylvania</p>
            <h1>King Seat Tavern</h1>
          </div> */}
        </div>
      </section>

      <section className="section" >
        <div className="container" >
          <div className="homeBlurb" style={{paddingTop:'50px', paddingBottom:'50px'}} aria-label="Quick actions">
            <div className="homeBlurb__text">Ice cold drinks, live entertainment, sports and more!</div>
            <div className="homeBlurb__actions">
              <a className="btn btn--primary" href="tel:7243927506" aria-label="Call 724-392-7506">
                Call 724-392-7506
              </a>
              <a
                className="btn btn--ghost"
                href="https://maps.app.goo.gl/EJUt86sTV3QqBCqH9"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="homeTwoCol" aria-label="Facebook and upcoming events">
            <div>
              <div className="section__header section__header--centerMobile">
                <h2>
                  <span className="eventsBurst" aria-label="Upcoming Events">
                    Upcoming Events
                  </span>
                </h2>
                {/* <p className="muted" style={{fontWeight:'500', fontSize:'1.4rem', fontFamily: "Cinzel, ui-serif, Georgia, 'Times New Roman', Times, serif"}}></p> */}
              </div>

              <div className="eventList" aria-label="Upcoming events list">
                {homeEvents.map((evt) => (
                  <article key={evt.id} className="eventCard">
                    <div className="eventCard__date">{formatEventDate(evt.date)}</div>
                    <div className="eventCard__title">{evt.title}</div>
                    {evt.time ? <div className="eventCard__meta muted">{evt.time}</div> : null}
                    {evt.note ? <div className="eventCard__meta muted">{evt.note}</div> : null}
                  </article>
                ))}
              </div>

              <p className="muted" style={{ marginTop: 12 }}>
                For the full list, see{' '}
                <a className="link" href="/events">
                  Events
                </a>
                .
              </p>
            </div>
            <div>
              <div className="section__header">
                <h2>Latest on Facebook</h2>
                {/* <p className="muted">Updates straight from The King Seat Tavern.</p> */}
              </div>

              <div className="fbEmbed" aria-label="Facebook timeline embed">
                <iframe
                  title="King Seat Tavern on Facebook"
                  src={facebookPluginSrc}
                  width="500"
                  height="650"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* <p className="muted" style={{ marginTop: 12 }}>
                Prefer the native app?{' '}
                <a className="link" href={facebookPageUrl} target="_blank" rel="noreferrer">
                  View the page on Facebook
                </a>
                .
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
