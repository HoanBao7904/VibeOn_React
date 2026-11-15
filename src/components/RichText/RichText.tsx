import { Link } from 'react-router-dom'

// @ hoặc # phải đứng đầu từ, hỗ trợ tiếng Việt
const TOKEN_REGEX = /((?<![\p{L}\p{N}_])[#@][\p{L}\p{N}_]+)/gu

export default function RichText({ content }: { content: string }) {
  // split với 1 capture group: phần tử lẻ luôn là hashtag/mention
  const parts = content.split(TOKEN_REGEX)

  return (
    <p className='mt-1 whitespace-pre-wrap break-words text-[15px] leading-normal text-white'>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part

        const isHashtag = part.startsWith('#')
        return (
          <Link
            key={i}
            to={isHashtag ? `/hashtag/${part.slice(1)}` : `/${part.slice(1)}`}
            className='text-[#1d9bf0] hover:underline'
          >
            {part}
          </Link>
        )
      })}
    </p>
  )
}
