import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type BandInquiryFormValues = {
  bandName: string
  bandWebsite: string
  rate: string
  notes: string
  company: string
}

export function BandsPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BandInquiryFormValues>({
    defaultValues: {
      bandName: '',
      bandWebsite: '',
      rate: '',
      notes: '',
      company: '',
    },
    mode: 'onChange',
  })

  const canSubmit = isValid && !isSubmitting

  useEffect(() => {
    const subscription = watch(() => {
      if (status !== 'idle') setStatus('idle')
      if (error) setError(null)
    })
    return () => subscription.unsubscribe()
  }, [watch, status, error])

  const onSubmit = handleSubmit(async (values) => {
    setError(null)
    setStatus('idle')

    try {
      const bandName = values.bandName.trim()
      const rate = values.rate.trim()
      const bandWebsite = values.bandWebsite.trim()
      const notes = values.notes.trim()
      const company = values.company.trim()

      if (!bandName || !rate) {
        setStatus('error')
        setError('Please enter your band name and rate.')
        return
      }

      const res = await fetch('/api/band-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bandName,
          bandWebsite: bandWebsite || null,
          rate,
          notes: notes || null,
          company: company || null,
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed (${res.status})`)
      }

      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  })

  return (
    <main className="section">
      <div className="container" style={{opacity: 0.7}}>
        {/* <h1>Bands Booking Request</h1>
 */}
        <div className="section__header">
          <p className="muted" style={{fontWeight:'500', fontSize:'1.4rem', fontFamily: "Cinzel, ui-serif, Georgia, 'Times New Roman', Times, serif", paddingLeft:'6px', paddingRight:'6px', paddingTop:'0px', marginTop:'2px', marginBottom:'2px'}}>
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
                autoComplete="organization"
                {...register('bandName', {
                  required: 'Please enter your band name.',
                  validate: (v) => (v.trim() ? true : 'Please enter your band name.'),
                })}
              />
              {errors.bandName ? (
                <div className="help" role="alert" style={{ color: '#991b1b' }}>
                  {errors.bandName.message}
                </div>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="bandWebsite">
                Band Website
              </label>
              <input
                id="bandWebsite"
                className="input"
                placeholder="https://…"
                inputMode="url"
                autoComplete="url"
                {...register('bandWebsite')}
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
                placeholder="$400, $500, Negotiable…"
                {...register('rate', {
                  required: 'Please enter your rate.',
                  validate: (v) => (v.trim() ? true : 'Please enter your rate.'),
                })}
              />
              {errors.rate ? (
                <div className="help" role="alert" style={{ color: '#ff4444' }}>
                  {errors.rate.message}
                </div>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="notes">
                Additional Notes
              </label>
              <textarea
                id="notes"
                className="textarea"
                placeholder="Dates available, genre, lineup, set length, etc."
                rows={5}
                {...register('notes')}
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
                {...register('company')}
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
                {isSubmitting ? 'Sending…' : 'Submit'}
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
