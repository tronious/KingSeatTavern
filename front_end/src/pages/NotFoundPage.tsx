import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Page not found</h1>
        <p className="muted">That route doesn’t exist yet.</p>
        <Link className="btn btn--primary" to="/">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
