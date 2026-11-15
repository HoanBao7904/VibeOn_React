import type { RefObject, TextareaHTMLAttributes } from 'react'
import { TOKEN_REGEX } from '~/utils/utils'

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  value: string
  textareaRef?: RefObject<HTMLTextAreaElement | null>
}

// Hai lớp PHẢI dùng chung style chữ, nếu không text sẽ lệch nhau
const TEXT_STYLE = 'whitespace-pre-wrap break-words text-[20px] leading-relaxed'

export default function HighlightedTextarea({ value, textareaRef, className = '', ...props }: Props) {
  const parts = value.split(TOKEN_REGEX)

  return (
    <div className={`relative w-full ${className}`}>
      {/* Lớp dưới: hiển thị chữ có màu, quyết định chiều cao */}
      <div aria-hidden className={`pointer-events-none min-h-[56px] text-white ${TEXT_STYLE}`}>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className='text-[#1d9bf0]'>
              {part}
            </span>
          ) : (
            part
          )
        )}
        {/* Giữ chiều cao khi dòng cuối là xuống dòng trống */}
        {'\u200b'}
      </div>

      {/* Lớp trên: textarea thật, chữ trong suốt, còn caret */}
      <textarea
        ref={textareaRef}
        value={value}
        {...props}
        className={`absolute inset-0 h-full w-full resize-none overflow-hidden bg-transparent text-transparent caret-white selection:bg-[#1d9bf0]/30 placeholder:text-[#6b7480] focus:outline-none ${TEXT_STYLE}`}
      />
    </div>
  )
}
