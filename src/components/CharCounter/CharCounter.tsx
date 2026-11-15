export const MAX_CHARS = 280
const CIRCUMFERENCE = 88
const WARN_REMAINING = 20

export default function CharCounter({ count }: { count: number }) {
  if (count === 0) return null

  const remaining = MAX_CHARS - count
  const offset = CIRCUMFERENCE - (Math.min(count, MAX_CHARS) / MAX_CHARS) * CIRCUMFERENCE
  const color = remaining < 0 ? 'text-[#f4212e]' : remaining <= WARN_REMAINING ? 'text-[#ffb4ab]' : 'text-[#1d9bf0]'

  return (
    <div className='flex items-center gap-2'>
      {remaining <= WARN_REMAINING && (
        <span className={`text-[13px] ${remaining < 0 ? 'text-[#f4212e]' : 'text-[#bfc7d3]'}`}>{remaining}</span>
      )}
      <svg className='h-6 w-6 -rotate-90' viewBox='0 0 36 36'>
        <circle className='stroke-[#30353b]' cx='18' cy='18' fill='none' r='14' strokeWidth='3' />
        <circle
          className={`transition-all duration-200 ${color}`}
          cx='18'
          cy='18'
          fill='none'
          r='14'
          stroke='currentColor'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeWidth='3'
        />
      </svg>
    </div>
  )
}
