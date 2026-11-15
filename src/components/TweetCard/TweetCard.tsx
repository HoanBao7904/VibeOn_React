import Media from '~/components/Media'
import type { GetNewFeeds } from '~/types/tweets.type'
import { timeAgo } from '~/utils/time'
import RichText from '../RichText/RichText'

// Chỉnh lại cho khớp với type thật của bạn
type Tweet = GetNewFeeds['result']['tweets'][number]

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  const { user } = tweet

  const actions = [
    {
      icon: 'chat_bubble',
      count: tweet.CommentCount,
      tone: 'hover:text-[#1d9bf0]',
      ring: 'group-hover:bg-[#1d9bf0]/10'
    },
    { icon: 'repeat', count: tweet.retweetCount, tone: 'hover:text-[#4adf9d]', ring: 'group-hover:bg-[#4adf9d]/10' },
    { icon: 'favorite', count: tweet.likes, tone: 'hover:text-[#ff5693]', ring: 'group-hover:bg-[#ff5693]/10' },
    { icon: 'bookmark', count: tweet.bookmarks, tone: 'hover:text-[#1d9bf0]', ring: 'group-hover:bg-[#1d9bf0]/10' }
  ]
  if (!user) return null
  return (
    <article className='flex gap-3 border-b border-[#30353b]/50 p-4 transition-colors hover:bg-[#252a30]/30'>
      {/* Avatar */}
      {/* <div className='shrink-0'>
        {user.avatar ? (
          <img
            src={user?.avatar}
            alt={user.name}
            className='h-10 w-10 rounded-full object-cover ring-1 ring-[#1d9bf0]/40'
          />
        ) : (
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#353a3f] to-[#1d9bf0] font-bold uppercase text-white ring-1 ring-[#1d9bf0]/40'>
            {user.name.charAt(0)}
          </div>
        )}
      </div> */}
      {/* Avatar */}
      <div className='shrink-0'>
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user?.name || 'User'} // 👈 Thêm fallback
            className='h-10 w-10 rounded-full object-cover ring-1 ring-[#1d9bf0]/40'
          />
        ) : (
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#353a3f] to-[#1d9bf0] font-bold uppercase text-white ring-1 ring-[#1d9bf0]/40'>
            {user?.name?.charAt(0) || '?'} {/* 👈 Thêm dấu ? */}
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between gap-1'>
          <div className='flex min-w-0 flex-wrap items-center gap-1'>
            <span className='cursor-pointer text-[15px] font-bold text-white hover:underline'>{user?.name}</span>
            {user?.verify === 1 && (
              <span
                className='material-symbols-outlined text-[17px] text-[#1d9bf0]'
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            )}
            <span className='truncate text-[13px] text-[#bfc7d3]'>@{user.username}</span>
            <span className='text-[12px] text-[#bfc7d3]'>•</span>
            <time
              dateTime={tweet.created_at}
              title={new Date(tweet.created_at).toLocaleString('vi-VN')}
              className='cursor-pointer text-[13px] text-[#bfc7d3] hover:underline'
            >
              {timeAgo(tweet.created_at)}
            </time>
          </div>
          <button
            type='button'
            aria-label='Thêm'
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#bfc7d3] transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]'
          >
            <span className='material-symbols-outlined text-[18px]'>more_horiz</span>
          </button>
        </div>

        {/* Nội dung (hashtag/mention đã được RichText biến thành link) */}
        <RichText content={tweet.content} />

        {tweet.medias.length > 0 && <Media medias={tweet.medias} />}

        {/* Tương tác */}
        <div className='mt-3 flex max-w-md items-center justify-between text-[#bfc7d3]'>
          {actions.map(({ icon, count, tone, ring }) => (
            <button key={icon} type='button' className={`group flex items-center gap-1.5 transition-colors ${tone}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${ring}`}>
                <span className='material-symbols-outlined text-[18px]'>{icon}</span>
              </span>
              <span className='text-[13px]'>{count}</span>
            </button>
          ))}

          <div className='flex items-center gap-1.5'>
            <span className='flex h-8 w-8 items-center justify-center'>
              <span className='material-symbols-outlined text-[18px]'>bar_chart</span>
            </span>
            <span className='text-[13px]'>{tweet.user_views}</span>
          </div>

          <button
            type='button'
            aria-label='Chia sẻ'
            className='flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]'
          >
            <span className='material-symbols-outlined text-[18px]'>share</span>
          </button>
        </div>
      </div>
    </article>
  )
}
