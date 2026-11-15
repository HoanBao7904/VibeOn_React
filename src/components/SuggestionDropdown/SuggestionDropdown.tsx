import type { SuggestionItem } from '~/hooks/useMentionHashtag'

interface Props {
  title: string
  items: SuggestionItem[]
  activeIndex: number
  onSelect: (item: SuggestionItem) => void
}

export default function SuggestionDropdown({ title, items, activeIndex, onSelect }: Props) {
  return (
    <div className='absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-[#1b2025] border border-[#30353b] rounded-xl shadow-2xl z-50'>
      <div className='px-3 py-2 text-xs font-semibold text-[#bfc7d3] border-b border-[#30353b]'>{title}</div>
      {items.map((item, idx) => (
        <button
          key={item.key}
          type='button'
          // onMouseDown + preventDefault: không làm textarea mất focus (tránh onBlur đóng dropdown trước khi chọn)
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(item)
          }}
          className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-colors ${
            idx === activeIndex ? 'bg-[#252a30]' : 'hover:bg-[#252a30]'
          }`}
        >
          {item.sublabel?.startsWith('@') &&
            (item.avatar ? (
              <img src={item.avatar} alt='' className='w-8 h-8 rounded-full object-cover' />
            ) : (
              <div className='w-8 h-8 rounded-full bg-[#1d9bf0] text-white flex items-center justify-center font-bold'>
                {item.label.charAt(0)}
              </div>
            ))}
          <div className='flex flex-col'>
            <span className='text-[14px] font-bold text-white'>{item.label}</span>
            {item.sublabel && <span className='text-[12px] text-[#bfc7d3]'>{item.sublabel}</span>}
          </div>
        </button>
      ))}
    </div>
  )
}
