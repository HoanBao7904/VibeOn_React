import { useState } from 'react'
import { TweetAudience } from '~/types/enum.type'

const OPTIONS = [
  {
    value: TweetAudience.Everyone,
    icon: 'public',
    label: 'Mọi người',
    desc: 'Bất kỳ ai trong và ngoài VibeOn',
    color: 'text-[#1d9bf0]'
  },
  {
    value: TweetAudience.TwitterCircle,
    icon: 'donut_large',
    label: 'Vibe Circle',
    desc: 'Chỉ người trong Vibe Circle',
    color: 'text-[#4adf9d]'
  }
]

interface Props {
  value: TweetAudience
  onChange: (value: TweetAudience) => void
}

export default function AudienceSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]
  const isCircle = value === TweetAudience.TwitterCircle

  return (
    <div className='relative inline-block w-fit mb-1'>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
          isCircle ? 'bg-[#01ba7c]/20 text-[#4adf9d]' : 'bg-[#1b2025] text-[#1d9bf0]'
        }`}
      >
        <span className='material-symbols-outlined text-[15px]'>{current.icon}</span>
        <span>{current.label}</span>
        <span className='material-symbols-outlined text-[14px]'>expand_more</span>
      </button>

      {open && (
        <div className='absolute left-0 top-8 z-30 w-64 rounded-xl bg-[#252a30] shadow-xl p-1 flex flex-col gap-0.5 border border-[#30353b]'>
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type='button'
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className='flex items-start gap-2 p-2 rounded-lg text-left hover:bg-[#30353b] transition-colors'
            >
              <span className={`material-symbols-outlined ${o.color} text-[20px] mt-0.5`}>{o.icon}</span>
              <div className='flex flex-col'>
                <span className={`text-[14px] font-bold ${o.color === 'text-[#4adf9d]' ? o.color : 'text-white'}`}>
                  {o.label}
                </span>
                <span className='text-[13px] text-[#bfc7d3]'>{o.desc}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
