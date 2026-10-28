import React from 'react'
import SidebarLeft from '~/components/SidebarLeft'
import SidebarRight from '~/components/SidebarRight'
// Import Header của bạn ở đây (nếu có)

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='min-h-screen bg-background text-[#dee3ea] antialiased flex flex-col'>
      {/* Header cố định trên cùng (nếu có, hoặc nằm trong MainLayout luôn) */}
      <header className='fixed inset-x-0 top-0 z-50 h-14 bg-background/80 backdrop-blur-xl'>
        <div className='mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4'>
          <span className='text-xl font-bold tracking-tight'>VibeOn</span>
        </div>
      </header>

      {/* Vùng chứa 3 cột */}
      <div className='mx-auto flex w-full max-w-[1280px] justify-between flex-1 pt-14'>
        {/* Cột Trái */}
        <SidebarLeft />

        {/* Cột Giữa: Nội dung trang Me sẽ được đổ vào đây */}
        <div className='flex max-w-[990px] flex-1'>
          <main className='min-h-screen w-full max-w-[600px] bg-background border-x border-[#252a30]'>
            {children} {/* 👈 children chính là <Me /> */}
          </main>

          {/* Cột Phải */}
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}
