import { useEffect, useRef, useState } from 'react'
import { MediaType, type Media } from '~/types/enum.type'

interface Props {
  medias: Media[]
  onRemove: (index: number) => void
}

export default function MediaCarousel({ medias, onRemove }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const prevLengthRef = useRef(medias.length)
  const [current, setCurrent] = useState(0)

  const goTo = (index: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  // Cập nhật số thứ tự khi trượt/vuốt
  const handleScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  // Thêm ảnh mới thì tự nhảy tới ảnh vừa thêm
  useEffect(() => {
    if (medias.length > prevLengthRef.current) goTo(medias.length - 1)
    prevLengthRef.current = medias.length
  }, [medias.length])

  if (medias.length === 0) return null

  const total = medias.length
  const hasPrev = current > 0
  const hasNext = current < total - 1

  const arrowClass =
    'absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80'

  return (
    <div className='relative mt-3 overflow-hidden rounded-2xl border border-[#30353b] bg-black'>
      {/* Track trượt ngang */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className='flex h-80 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {medias.map((media) => (
          <div key={media.url} className='flex h-full w-full shrink-0 snap-center items-center justify-center'>
            {media.type === MediaType.Video ? (
              <video src={media.url} controls className='h-full w-full object-contain' />
            ) : (
              <img src={media.url} alt='preview' className='h-full w-full object-contain' />
            )}
          </div>
        ))}
      </div>

      {/* Nút xóa ảnh đang xem */}
      <button
        type='button'
        onClick={() => onRemove(current)}
        title='Xóa ảnh này'
        className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90'
      >
        <span className='material-symbols-outlined text-[18px]'>close</span>
      </button>

      {total > 1 && (
        <>
          {/* Số thứ tự */}
          <span className='absolute left-2 top-2 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[12px] font-semibold text-white'>
            {current + 1}/{total}
          </span>

          {/* Nút trước / sau */}
          {hasPrev && (
            <button type='button' onClick={() => goTo(current - 1)} className={`${arrowClass} left-2`}>
              <span className='material-symbols-outlined text-[22px]'>chevron_left</span>
            </button>
          )}
          {hasNext && (
            <button type='button' onClick={() => goTo(current + 1)} className={`${arrowClass} right-2`}>
              <span className='material-symbols-outlined text-[22px]'>chevron_right</span>
            </button>
          )}

          {/* Chấm tròn */}
          <div className='absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/50 px-2 py-1'>
            {medias.map((media, i) => (
              <button
                key={media.url}
                type='button'
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-4 bg-[#1d9bf0]' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
