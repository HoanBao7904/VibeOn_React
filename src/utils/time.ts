const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' })

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60]
]

export function timeAgo(date: string | Date) {
  const diffSeconds = (new Date(date).getTime() - Date.now()) / 1000
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(diffSeconds) >= seconds) return rtf.format(Math.round(diffSeconds / seconds), unit)
  }
  return 'Vừa xong'
}
