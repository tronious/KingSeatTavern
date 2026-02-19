import mobileBarImg from '../assets/mobilebar.webp'

export function MobileBarPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section__header">
          {/* <h1 style={{ color: 'white' }}>Mobile Bar</h1> */}
        </div>

        <div className="card mobileBar">
          
          <div className="mobileBar__copy">
            <p className="mobileBar__lead">
              Elevate your next event with this chic King Seat Tavern mobile bar — perfect for weddings,
              graduation parties, birthday celebrations, and corporate events!
            </p>

            <p className="mobileBar__text">
              With its stylish black-and-white striped awning and classic tavern touch, this bar brings
              sophistication and fun wherever you need it. Whether you’re toasting under the stars or
              celebrating indoors, we’ll help make your gathering unforgettable.
            </p>

            <ul className="mobileBar__bullets" aria-label="Mobile bar highlights">
              <li>Custom drink service</li>
              <li>Professional setup</li>
              <li>Portable luxury for any venue</li>
            </ul>

            <div className="mobileBar__cta">
              <div className="mobileBar__ctaLabel">Call for pricing and availability:</div>
              <a className="link mobileBar__phone" href="tel:7243927560">
                724-392-7560
              </a>
            </div>
          </div>

          <img
            className="mobileBar__image"
            src={mobileBarImg}
            alt="King Seat Tavern mobile bar"
            loading="lazy"
          />

        </div>
      </div>
    </main>
  )
}
