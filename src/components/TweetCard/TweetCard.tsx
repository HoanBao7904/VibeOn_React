import Media from '~/components/Media'
import type { GetNewFeeds } from '~/types/tweets.type'
import { timeAgo } from '~/utils/time'
import RichText from '../RichText/RichText'

type Tweet = GetNewFeeds['result']['tweets'][number]

export default function TweetCard({ tweet }: { tweet: Tweet }) {
  const user = tweet.author

  if (!user) return null

  const actions = [
    {
      icon: 'chat_bubble',
      count: tweet.comment_count ?? 0,
      tone: 'hover:text-[#1d9bf0]',
      ring: 'group-hover:bg-[#1d9bf0]/10'
    },
    {
      icon: 'favorite',
      count: tweet.like_count ?? 0,
      tone: 'hover:text-[#ff5693]',
      ring: 'group-hover:bg-[#ff5693]/10'
    },
    {
      icon: 'bookmark',
      count: tweet.bookmark_count ?? 0,
      tone: 'hover:text-[#1d9bf0]',
      ring: 'group-hover:bg-[#1d9bf0]/10'
    }
  ]

  return (
    <article className='flex gap-3 border-b border-[#30353b]/50 p-4 transition-colors hover:bg-[#252a30]/30'>
      {/* Avatar */}
      <div className='shrink-0'>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className='h-10 w-10 rounded-full object-cover ring-1 ring-[#1d9bf0]/40'
          />
        ) : (
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#353a3f] to-[#1d9bf0] font-bold uppercase text-white ring-1 ring-[#1d9bf0]/40'>
            {user.name?.charAt(0) || '?'}
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex min-w-0 flex-wrap items-center gap-1'>
            <span className='cursor-pointer text-[15px] font-bold text-white hover:underline'>{user.name}</span>

            <span className='truncate text-[13px] text-[#8899a6]'>@{user.username}</span>

            <span className='text-[12px] text-[#8899a6]'>•</span>

            <time
              dateTime={tweet.created_at}
              title={new Date(tweet.created_at).toLocaleString('vi-VN')}
              className='text-[13px] text-[#8899a6]'
            >
              {timeAgo(tweet.created_at)}
            </time>
          </div>

          <button
            type='button'
            className='flex h-8 w-8 items-center justify-center rounded-full text-[#8899a6] transition hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]'
          >
            <span className='material-symbols-outlined text-[18px]'>more_horiz</span>
          </button>
        </div>

        {/* Content */}
        <div className='mt-1'>
          <RichText content={tweet.content} />
        </div>

        {/* Media */}
        {tweet.medias?.length > 0 && (
          <div className='mt-3'>
            <Media medias={tweet.medias} />
          </div>
        )}

        {/* Actions */}
        <div className='mt-3 flex items-center justify-between text-[#8899a6]'>
          <div className='flex items-center gap-6'>
            {actions.map((action) => (
              <button
                key={action.icon}
                type='button'
                className={`group flex items-center gap-1 transition-colors ${action.tone}`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${action.ring}`}
                >
                  <span className='material-symbols-outlined text-[18px]'>{action.icon}</span>
                </span>

                <span className='text-[13px]'>{action.count}</span>
              </button>
            ))}
          </div>

          <div className='flex items-center gap-1'>
            <span className='material-symbols-outlined text-[18px]'>bar_chart</span>

            <span className='text-[13px]'>{tweet.user_views ?? 0}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
