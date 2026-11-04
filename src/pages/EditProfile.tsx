import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import EditableField from '~/components/EditableField/EditableField'
import { updateMeRule, type UpdateFormData } from '~/rules/auth.rule'
import type { errorResponse } from '~/types/auth.type'
import { setProfile } from '~/utils/auth'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export type EditTableField =
  'name' | 'date_of_birth' | 'bio' | 'location' | 'website' | 'username' | 'avatar' | 'cover_photo'

export default function EditProfile() {
  const [editingField, setEditingField] = useState<EditTableField | null>(null)

  const queryClient = useQueryClient()

  const {
    register,
    setError,
    reset, //cập nhập lại value của trường đó khi hủy thao tác
    handleSubmit
  } = useForm<UpdateFormData>({
    resolver: yupResolver(updateMeRule),
    defaultValues: {
      name: '',
      username: '',
      bio: '',
      location: '',
      website: '',
      date_of_birth: ''
    }
  })

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.getMeApi()
  })
  const me = data?.data.result

  const updateMutation = useMutation({
    mutationFn: authApi.patchUpdateMe
  })

  // Bấm nút Sửa: đưa form về giá trị hiện tại từ server rồi mở ô sửa
  const handleOpenEditName = (field: EditTableField) => {
    reset({
      name: me?.name ?? '',
      username: me?.username ?? '',
      bio: me?.bio ?? '',
      location: me?.location ?? '',
      website: me?.website ?? '',
      date_of_birth: me?.date_of_birth ? me.date_of_birth.slice(0, 10) : ''
    })
    setEditingField(field)
  }

  // Bấm Hủy: bỏ phần gõ dở, đóng ô
  const handleCancelName = () => {
    reset({
      name: me?.name ?? '',
      username: me?.username ?? '',
      bio: me?.bio ?? '',
      location: me?.location ?? '',
      website: me?.website ?? '',
      date_of_birth: me?.date_of_birth ? me.date_of_birth.slice(0, 10) : ''
    })
    setEditingField(null)
  }

  // Bấm Lưu (đã qua Yup validate)
  // const onSubmit = handleSubmit((formData) => {
  //   if (!editingField) return

  //   const field = editingField
  //   let value = formData[field]

  //   // Xử lý định dạng ngày tháng trước khi gửi lên server
  //   if (field === 'date_of_birth' && value) {
  //     value = new Date(value).toISOString()
  //   }

  //   updateMutation.mutate(
  //     { [field]: value }, // Chỉ gửi đúng 1 trường đang sửa
  //     {
  //       onSuccess: async () => {
  //         // Lấy lại profile mới
  //         const res = await queryClient.fetchQuery({
  //           queryKey: ['me'],
  //           queryFn: () => authApi.getMeApi()
  //         })
  //         const updatedUser = res.data.result

  //         // Cập nhật localStorage
  //         setProfile(updatedUser)
  //         // 1. Báo cho React Query fetch lại API /me
  //         await queryClient.invalidateQueries({ queryKey: ['me'] })

  //         setEditingField(null)
  //         toast.success('Cập nhật thành công')
  //       },
  //       onError: (error) => {
  //         if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
  //           // RHF tự bắt lỗi của Backend và hiển thị lên UI
  //           const msg = error.response?.data.error?.[field]?.msg ?? 'Giá trị không hợp lệ'
  //           setError(field, { message: msg })
  //         }
  //       }
  //     }
  //   )
  // })
  const onSubmit = handleSubmit((formData) => {
    if (!editingField) return

    const field = editingField
    let value = formData[field]

    if (field === 'date_of_birth' && value) {
      value = new Date(value).toISOString()
    }

    updateMutation.mutate(
      { [field]: value },
      {
        // 1. Nhận response từ API PATCH
        onSuccess: async (response) => {
          // 2. Lấy đúng cục data user mới từ API (như bạn gửi ở trên: result.value)
          const updatedUser = response.data.result.value

          // 3. Bơm thẳng vào cache của React Query để UI lập tức đổi tên
          await queryClient.invalidateQueries({ queryKey: ['me'] })

          // 4. Cập nhật localStorage
          setProfile(updatedUser)

          // 5. Đóng form và báo thành công
          setEditingField(null)
          toast.success('Cập nhật thành công')
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
            const msg = error.response?.data.error?.[field]?.msg ?? 'Giá trị không hợp lệ'
            setError(field, { message: msg })
          }
        }
      }
    )
  })
  return (
    <div className='flex h-full w-full overflow-hidden bg-[#0a0e14] text-[#f1f5f9] font-sans antialiased selection:bg-[#1d9bf0]/30 selection:text-white'>
      {/* BEGIN: LeftMiniSidebar */}
      <aside className='w-[72px] xl:w-[80px] border-r border-[#233044]/70 flex flex-col justify-between items-center py-6 px-2 bg-[#0d121a] shrink-0 z-20'>
        <div className='flex flex-col items-center gap-7 w-full'>
          <a className='p-2.5 rounded-2xl hover:bg-[#111721] transition-all duration-300 group' href='#' title='VibeOn'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform flex items-center justify-center'>
              <div className='w-full h-full bg-[#0a0e14] rounded-[10px] flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-cyan-400'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  viewBox='0 0 24 24'
                >
                  <path d='M2 10s3-5 5-5c3 0 4 10 7 10 2 0 4-5 6-5 1 0 2 1 2 1'></path>
                  <circle cx='12' cy='12' r='9' strokeOpacity='0.3'></circle>
                </svg>
              </div>
            </div>
          </a>

          <nav className='flex flex-col items-center gap-4 w-full'>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Trang chủ'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Khám phá'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Vibe Reels'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' strokeLinecap='round' strokeLinejoin='round'></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition relative group'
              href='#'
              title='Tin nhắn'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-[#1d9bf0] rounded-full animate-ping'></span>
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-[#1d9bf0] rounded-full'></span>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Thông báo'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Tạo bài viết mới'
            >
              <svg
                className='w-6 h-6 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path d='M12 4v16m8-8H4' strokeLinecap='round' strokeLinejoin='round'></path>
              </svg>
            </a>
            <a
              className='p-3 text-[#94a3b8] hover:text-white hover:bg-[#111721]/80 rounded-xl transition group'
              href='#'
              title='Trang cá nhân'
            >
              <div className='w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1.5px]'>
                <div className='w-full h-full bg-[#111721] rounded-full flex items-center justify-center text-xs font-bold text-cyan-300'>
                  HB
                </div>
              </div>
            </a>
          </nav>
        </div>

        <div className='flex flex-col items-center gap-3 w-full'>
          <a
            className='p-3 text-[#1d9bf0] bg-[#1d9bf0]/10 rounded-2xl border border-[#1d9bf0]/30 shadow-inner group'
            href='#'
            title='Cài đặt'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2.2' viewBox='0 0 24 24'>
              <path
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' strokeLinecap='round' strokeLinejoin='round'></path>
            </svg>
          </a>
        </div>
      </aside>

      {/* BEGIN: SettingsNavigationColumn */}
      <div className='w-[320px] md:w-[352px] border-r border-[#233044]/60 bg-[#111721] flex flex-col h-full shrink-0 overflow-y-auto'>
        <div className='p-6 pb-3 sticky top-0 bg-[#111721]/90 backdrop-blur-md z-10'>
          <h1 className='text-2xl font-bold text-white tracking-tight mb-4 flex items-center justify-between'>
            <span>Cài đặt</span>
          </h1>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94a3b8]'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </span>
            <input
              className='w-full pl-10 pr-4 py-2 bg-[#0a0e14] border border-[#233044] rounded-xl text-sm placeholder-[#94a3b8]/60 text-white focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] transition-all duration-200'
              placeholder='Tìm kiếm cài đặt...'
              type='text'
            />
          </div>
        </div>

        <div className='px-3 pb-8 space-y-6 flex-1'>
          {/* Nhóm: Cách bạn dùng VibeOn */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Cách bạn dùng VibeOn
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#1d9bf0]/15 text-white font-medium border border-[#1d9bf0]/30 shadow-sm'
                href='#'
              >
                <svg
                  className='w-5 h-5 text-[#1d9bf0] shrink-0'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm font-semibold flex-1'>Chỉnh sửa hồ sơ</span>
                <span className='w-2 h-2 rounded-full bg-[#1d9bf0] shadow-sm shadow-[#1d9bf0]'></span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Thông báo</span>
              </a>
            </div>
          </div>

          {/* Nhóm: Ai có thể xem nội dung */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Ai có thể xem nội dung
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Quyền riêng tư tài khoản</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg
                  className='w-5 h-5 shrink-0 text-emerald-400'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Bạn thân (Vibe Circle)</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Đã chặn</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Tin &amp; Vị trí trực tiếp</span>
              </a>
            </div>
          </div>

          {/* Nhóm: Cách tương tác khác */}
          <div>
            <div className='px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]/70'>
              Cách người khác tương tác
            </div>
            <div className='mt-1 space-y-1'>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Tin nhắn &amp; Phản hồi tin</span>
              </a>
              <a
                className='flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#161f2e]/40 transition'
                href='#'
              >
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='text-sm'>Lượt gắn thẻ &amp; Nhắc tên</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BEGIN: MainContentEditProfile */}
      <main className='flex-1 overflow-y-auto bg-[#0a0e14] p-6 lg:p-12 relative flex justify-center'>
        <div className='w-full max-w-2xl pb-24'>
          <div className='flex items-center justify-between mb-8 pb-4 border-b border-[#233044]/50'>
            <div>
              <h2 className='text-2xl lg:text-3xl font-bold tracking-tight text-white'>Chỉnh sửa hồ sơ</h2>
              <p className='text-sm text-[#94a3b8] mt-1'>
                Cập nhật thông tin cá nhân và định danh hiển thị trên VibeOn Network
              </p>
            </div>
          </div>

          <div className='space-y-6'>
            {/* NAME */}

            <EditableField
              type='text'
              editingField='name'
              activeEditingField={editingField}
              register={register}
              onsubmit={onSubmit}
              onCancel={handleCancelName}
              onOpenEdit={() => handleOpenEditName('name')}
              disabled={updateMutation.isPending}
              isLoading={updateMutation.isPending}
              me={me}
              label='Tên người dùng'
            />
            {/* USERNAME */}

            <EditableField
              type='text'
              editingField='username'
              activeEditingField={editingField}
              register={register}
              onsubmit={onSubmit}
              onCancel={handleCancelName}
              onOpenEdit={() => handleOpenEditName('username')}
              disabled={updateMutation.isPending}
              isLoading={updateMutation.isPending}
              me={me}
              label='Tên người dùng'
            />

            {/* BIO */}
            <EditableField
              type='text'
              editingField='bio'
              activeEditingField={editingField}
              register={register}
              onsubmit={onSubmit}
              onCancel={handleCancelName}
              onOpenEdit={() => handleOpenEditName('bio')}
              disabled={updateMutation.isPending}
              isLoading={updateMutation.isPending}
              me={me}
              label='Tiểu sử'
            />

            {/* LOCATION & WEBSITE */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* Location */}

              <EditableField
                type='text'
                editingField='location'
                activeEditingField={editingField}
                register={register}
                onsubmit={onSubmit}
                onCancel={handleCancelName}
                onOpenEdit={() => handleOpenEditName('location')}
                disabled={updateMutation.isPending}
                isLoading={updateMutation.isPending}
                me={me}
                label='Vị trí'
              />

              {/* Website */}

              <EditableField
                type='text'
                editingField='website'
                activeEditingField={editingField}
                register={register}
                onsubmit={onSubmit}
                onCancel={handleCancelName}
                onOpenEdit={() => handleOpenEditName('website')}
                disabled={updateMutation.isPending}
                isLoading={updateMutation.isPending}
                me={me}
                label='Trang Web'
              />
            </div>

            {/* DOB */}
            <EditableField
              type='date'
              editingField='date_of_birth'
              activeEditingField={editingField}
              register={register}
              onsubmit={onSubmit}
              onCancel={handleCancelName}
              onOpenEdit={() => handleOpenEditName('date_of_birth')}
              disabled={updateMutation.isPending}
              isLoading={updateMutation.isPending}
              me={me}
              label='Ngày Sinh'
            />
          </div>
        </div>
      </main>
    </div>
  )
}
