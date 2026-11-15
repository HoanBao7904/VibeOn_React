import { useState, useRef } from 'react'

interface Media {
  url: string
  type: number
}

export default function Media({ medias }: { medias: Media[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Hàm cuộn tới ảnh cụ thể
  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth
      scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' })
      setCurrentIndex(index)
    }
  }

  // Hàm xử lý khi người dùng tự vuốt (trên mobile)
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const width = scrollRef.current.clientWidth
      const newIndex = Math.round(scrollLeft / width)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  const nextImage = () => {
    if (currentIndex < medias.length - 1) scrollToImage(currentIndex + 1)
  }

  const prevImage = () => {
    if (currentIndex > 0) scrollToImage(currentIndex - 1)
  }

  return (
    <div className='relative group w-full mt-3 rounded-xl overflow-hidden border border-[#30353b]/50 bg-[#171c21]'>
      {/* Khung chứa các ảnh có thể cuộn */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ẩn thanh cuộn
      >
        {medias.map((media, idx) => (
          <div key={idx} className='w-full shrink-0 snap-center flex items-center justify-center relative'>
            {media.type === 1 ? (
              <video src={media.url} controls className='w-full max-h-[500px] object-contain' />
            ) : (
              <img src={media.url} alt='media' className='w-full max-h-[500px] object-cover' />
            )}
          </div>
        ))}
      </div>

      {/* Nút Previous (Trái) - Chỉ hiện khi có nhiều hơn 1 ảnh và không phải ảnh đầu */}
      {medias.length > 1 && currentIndex > 0 && (
        <button
          onClick={prevImage}
          className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10'
        >
          <span className='material-symbols-outlined text-[20px]'>chevron_left</span>
        </button>
      )}

      {/* Nút Next (Phải) - Chỉ hiện khi có nhiều hơn 1 ảnh và không phải ảnh cuối */}
      {medias.length > 1 && currentIndex < medias.length - 1 && (
        <button
          onClick={nextImage}
          className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10'
        >
          <span className='material-symbols-outlined text-[20px]'>chevron_right</span>
        </button>
      )}

      {/* Dấu chấm (Dots) hiển thị vị trí ảnh - Giống IG */}
      {medias.length > 1 && (
        <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10'>
          {medias.map((_, idx) => (
            <div
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentIndex ? 'bg-[#1d9bf0] scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
