import { keepPreviousData, useQuery } from '@tanstack/react-query'
import tweetsApi from '~/apis/tweets.api'
import useQueryConfig from '~/hooks/useQueryConfig'
import CreateTweet from './CreateTweet'
import TweetCard from '~/components/TweetCard/TweetCard'

function FeedSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className='flex animate-pulse gap-3 border-b border-[#30353b]/50 p-4'>
          <div className='h-10 w-10 rounded-full bg-[#1b2025]' />
          <div className='flex-1 space-y-2'>
            <div className='h-3 w-1/3 rounded bg-[#1b2025]' />
            <div className='h-3 w-full rounded bg-[#1b2025]' />
            <div className='h-3 w-2/3 rounded bg-[#1b2025]' />
          </div>
        </div>
      ))}
    </>
  )
}

export default function HomeFeeds() {
  const queryConfig = useQueryConfig()
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['tweets/newsfeed', queryConfig],
    queryFn: () => tweetsApi.getNewFeeds(queryConfig),
    staleTime: 3000 * 60,
    placeholderData: keepPreviousData
  })

  const tweets = data?.data.result.tweets ?? []

  return (
    <main className='mx-auto min-h-screen w-full max-w-[600px] border-x border-[#30353b]/50 bg-[#0f1419] font-sans text-[#dee3ea]'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-[#30353b]/50 bg-[#0a0f14]/80 px-4 py-2 backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          <span className='text-[14px] font-semibold text-white'>Luồng bài viết</span>
          <span className='inline-flex items-center rounded-full bg-[#252a30] px-2 py-0.5 text-[12px] text-[#1d9bf0]'>
            Thời gian thực
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <button
            type='button'
            aria-label='Bộ lọc'
            className='flex h-8 w-8 items-center justify-center rounded-full text-[#bfc7d3] transition-colors hover:bg-[#1b2025] hover:text-white'
          >
            <span className='material-symbols-outlined text-[18px]'>tune</span>
          </button>
          <button
            type='button'
            aria-label='Làm mới'
            onClick={() => refetch()}
            disabled={isFetching}
            className='flex h-8 w-8 items-center justify-center rounded-full text-[#bfc7d3] transition-colors hover:text-[#1d9bf0]'
          >
            <span className={`material-symbols-outlined text-[18px] ${isFetching ? 'animate-spin' : ''}`}>sync</span>
          </button>
        </div>
      </div>

      {/* Composer */}
      <div className='border-b border-[#30353b]/50'>
        <CreateTweet />
      </div>
      <div className='h-2 w-full border-b border-[#30353b]/50 bg-[#0a0f14]/50' />

      {/* Feed */}
      {isLoading && <FeedSkeleton />}

      {isError && (
        <div className='flex flex-col items-center gap-3 p-8 text-[#bfc7d3]'>
          <span>Không tải được bảng tin.</span>
          <button
            type='button'
            onClick={() => refetch()}
            className='rounded-full bg-[#1d9bf0] px-4 py-1.5 text-[14px] font-semibold text-white hover:bg-[#1a8cd8]'
          >
            Thử lại
          </button>
        </div>
      )}

      {!isLoading && !isError && tweets.length === 0 && (
        <p className='p-8 text-center text-[#bfc7d3]'>Chưa có bài viết nào. Hãy đăng Vibe đầu tiên!</p>
      )}

      {tweets && tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)}
    </main>
  )
}
