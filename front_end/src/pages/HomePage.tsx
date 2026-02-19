import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import kSeatLogo from '../assets/KSLogo.png'
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
  // Use a Page URL format that the Facebook Page Plugin reliably renders.
  const facebookPageUrl = 'https://www.facebook.com/175575592312343'

  const fbEmbedRef = useRef<HTMLDivElement | null>(null)
  const [fbWidth, setFbWidth] = useState(360)

  useEffect(() => {
    const el = fbEmbedRef.current
    if (!el) return

    let rafId = 0
    const update = () => {
      // Facebook's Page Plugin often renders a blank internal right column when wider.
      // Keeping the plugin within a single-column width avoids that.
      const next = Math.max(240, Math.min(360, Math.round(el.clientWidth)))
      setFbWidth((prev) => (prev === next ? prev : next))
    }

    update()

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  const facebookPluginSrc = useMemo(() => {
    return (
      'https://www.facebook.com/plugins/page.php' +
      `?href=${encodeURIComponent(facebookPageUrl)}` +
      '&tabs=timeline' +
      `&width=${fbWidth}` +
      '&height=650' +
      '&small_header=true' +
      '&adapt_container_width=true' +
      '&hide_cover=false' +
      '&show_facepile=false'
    )
  }, [facebookPageUrl, fbWidth])

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
          <div className="homeBlurb" style={{paddingTop:'0px', paddingBottom:'0px'}} aria-label="Quick actions">
            <Link className="btn btn--primary homeBlurb__btn homeBlurb__btn--desktop" to="/menu" aria-label="View menu">
              Menu
            </Link>

            <img className="homeBlurb__logo" src={kSeatLogo} alt="King Seat Tavern" />

            <a
              className="homeBlurb__address"
              href="https://maps.app.goo.gl/EJUt86sTV3QqBCqH9"
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions to 4022 Route 130, Irwin, PA 15642"
            >
              4022 Rt. 130, Irwin, PA 15642
            </a>

            <a
              className="btn btn--ghost homeBlurb__btn homeBlurb__btn--desktop"
              href="tel:7243927506"
              aria-label="Call 724-392-7506"
            >
              Call
            </a>
            {/* <div className="homeBlurb__actions">
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
            </div> */}
          </div>

          <div className="homeQuickActions" aria-label="Quick actions">
            <Link className="btn homeQuickActions__btn homeQuickActions__menu" to="/menu" aria-label="View menu">
              MENU
            </Link>
            <a
              className="btn homeQuickActions__btn homeQuickActions__call"
              href="tel:7243927506"
              aria-label="Call 724-392-7506"
            >
              Call 724-392-7506
            </a>
          </div>

          <div className="homeTwoCol" aria-label="Facebook and upcoming events">
            <div>
              <div className="section__header section__header--centerMobile">
                <h2>
                  <span style={{color:'white', fontSize:'1.6rem'}} aria-label="Upcoming Events">
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
              <div className="section__header section__header--centerMobile">
                <h2 style={{color:'white', fontSize:'1.6rem'}}>Latest on Facebook</h2>
                {/* <p className="muted">Updates straight from The King Seat Tavern.</p> */}
              </div>

              <div ref={fbEmbedRef} className="fbEmbed" aria-label="Facebook timeline embed">
                <iframe
                  title="King Seat Tavern on Facebook"
                  src={facebookPluginSrc}
                  width={fbWidth}
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
