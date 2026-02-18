export function EventsPage() {
  // Use a Page URL format that the Facebook Page Plugin reliably renders.
  const facebookPageUrl = 'https://www.facebook.com/175575592312343'
  const facebookPluginSrc =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(facebookPageUrl)}` +
    '&tabs=events' +
    '&width=360' +
    '&height=650' +
    '&small_header=true' +
    '&adapt_container_width=true' +
    '&hide_cover=false' +
    '&show_facepile=false'

  return (
    <main className="section">
      <div className="container">
        <div className="section__header">
          <h1>Upcoming Events</h1>
          <p className="muted">See what’s coming up at King Seat Tavern.</p>
        </div>

        <div className="fbEmbed" aria-label="Facebook events embed">
          <iframe
            title="King Seat Tavern events on Facebook"
            src={facebookPluginSrc}
            width="360"
            height="650"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          <a className="link" href={facebookPageUrl} target="_blank" rel="noreferrer">
            View all events on Facebook
          </a>
          .
        </p>
      </div>
    </main>
  )
}
