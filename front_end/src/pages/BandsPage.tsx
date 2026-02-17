import { useMemo, useState } from 'react'

export function BandsPage() {
  const [bandName, setBandName] = useState('')
  const [bandWebsite, setBandWebsite] = useState('')
  const [rate, setRate] = useState('')
  const [notes, setNotes] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    if (status === 'submitting') return false
    return Boolean(bandName.trim() && rate.trim())
  }, [bandName, rate, status])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!bandName.trim() || !rate.trim()) {
      setStatus('error')
      setError('Please enter your band name and rate.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/band-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bandName: bandName.trim(),
          bandWebsite: bandWebsite.trim() || null,
          rate: rate.trim(),
          notes: notes.trim() || null,
          company: company.trim() || null,
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed (${res.status})`)
      }

      setStatus('success')
      setBandName('')
      setBandWebsite('')
      setRate('')
      setNotes('')
      setCompany('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="section">
      <div className="container" style={{opacity: 0.7}}>
        {/* <h1>Bands Booking Request</h1>
 */}
        <div className="section__header">
          <p className="muted" style={{fontWeight:'500', fontSize:'1.4rem', fontFamily: "Cinzel, ui-serif, Georgia, 'Times New Roman', Times, serif"}}>
            Want to play at King Seat Tavern? Send your details and we’ll reach out.
          </p>
        </div>

        <div className="card" role="region" aria-label="Band booking request">

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="bandName">
                Band Name
              </label>
              <input
                id="bandName"
                className="input"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
                autoComplete="organization"
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="bandWebsite">
                Band Website
              </label>
              <input
                id="bandWebsite"
                className="input"
                value={bandWebsite}
                onChange={(e) => setBandWebsite(e.target.value)}
                placeholder="https://…"
                inputMode="url"
                autoComplete="url"
              />
              <div className="help muted">Optional — website, Facebook, or EPK link.</div>
            </div>

            <div className="field">
              <label className="label" htmlFor="rate">
                Rate
              </label>
              <input
                id="rate"
                className="input"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="$400, $500, Negotiable…"
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="notes">
                Additional Notes
              </label>
              <textarea
                id="notes"
                className="textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dates available, genre, lineup, set length, etc."
                rows={5}
              />
            </div>

            <div className="hp" aria-hidden="true">
              <label className="label" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                className="input"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {status === 'success' ? (
              <p className="muted" role="status" style={{ margin: '6px 0 0' }}>
                Thanks — your request was sent.
              </p>
            ) : null}

            {status === 'error' && error ? (
              <p role="alert" style={{ margin: '6px 0 0', color: '#991b1b' }}>
                {error}
              </p>
            ) : null}

            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn--primary" type="submit" disabled={!canSubmit}>
                {status === 'submitting' ? 'Sending…' : 'Submit'}
              </button>
              <a className="btn btn--ghost" href="mailto:THEKINGSEATLLC@GMAIL.COM">
                Email instead
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
