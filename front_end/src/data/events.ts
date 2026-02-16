export type HomeEvent = {
  id: string
  date: string // ISO date (YYYY-MM-DD)
  title: string
  time?: string
  note?: string
}

// Lightweight, manual list for the Home page.
// Update this list whenever new bands/dates are announced.
export const homeEvents: HomeEvent[] = [
  {
    id: 'fri-2026-02-21',
    date: '2026-02-21',
    title: 'Live Band (TBD)',
    time: '8:00 PM',
    note: 'Check Facebook for the latest details.',
  },
  {
    id: 'sat-2026-02-28',
    date: '2026-02-28',
    title: 'Live Band (TBD)',
    time: '8:00 PM',
  },
]
