import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import { setAccessToken, setRefetchToken } from '~/utils/auth'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { type errorResponse } from '~/types/auth.type'
import useQueryParams from '~/hooks/useQueryParams'
import { useCountdown } from '~/hooks/useCountdown'
import { AppContext } from '~/contexts/app.contexts'

const RESEND_COOLDOWN = 60

export default function EmailVerifyPending() {
  const { profile } = useContext(AppContext)
  const query = useQueryParams()
  // const navigate = useNavigate()
  const token = query.token

  const email = profile ? profile.email : 'nhap@gmail.com' // Bạn có thể lấy từ URL hoặc State truyền sang

  const { isRunning, secondsLeft, start } = useCountdown(RESEND_COOLDOWN)

  // --- 1. LOGIC GỌI API XÁC THỰC ---
  const verifyMutation = useMutation({
    mutationFn: () => authApi.verifyEmailApi(token),
    onSuccess: (data) => {
      toast.success(data.data.message || 'Xác thực thành công!')
      if (data.data.result) {
        setAccessToken(data.data.result.acess_token)
        setRefetchToken(data.data.result.refresh_token)
      }
      // navigate('/login') // Chuyển về trang chủ
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Xác thực thất bại, đường dẫn có thể đã hết hạn.')
      }
    }
  })

  useEffect(() => {
    if (token) {
      verifyMutation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // --- 2. Gửi lại email xác thực ---
  const resendMutation = useMutation({
    mutationFn: () => authApi.resendVerifyEmailApi(),
    onSuccess: ({ data }) => {
      toast.success(data.message || 'Đã gửi lại thư xác thực mới!')
      start() // chỉ đếm lại khi gửi thành công
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<errorResponse>(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Gửi lại thất bại, vui lòng thử lại sau.')
      }
    }
  })

  useEffect(() => {
    start()
  }, [start])

  const canResend = !isRunning && !resendMutation.isPending

  // --- 3. LOGIC COPY EMAIL ---
  const handleCopy = () => {
    navigator.clipboard.writeText(email as string)
    toast.success('Đã sao chép email!')
  }

  return (
    <div className='bg-[#0f1419] font-sans text-[#dee3ea] flex min-h-screen flex-col items-center justify-center p-6 relative'>
      {/* Background Glows */}
      <div className='absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#1d9bf0]/15 rounded-full blur-3xl pointer-events-none -z-10'></div>
      <div className='absolute top-48 right-0 w-60 h-60 bg-[#ff5693]/10 rounded-full blur-3xl pointer-events-none -z-10'></div>

      <main className='w-full max-w-md mx-auto'>
        <div className='w-full bg-[#171c21] rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col items-center text-center'>
          {/* Top Accent Line */}
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1d9bf0] to-[#ff5693] opacity-80'></div>

          {/* Header */}
          <div className='flex items-center justify-between w-full pb-3'>
            <div className='flex items-center gap-2 text-left'>
              <div className='relative w-9 h-9 rounded-full bg-[#1b2025] flex items-center justify-center p-1.5 shadow-sm'>
                {/* SVG Logo (giữ nguyên) */}
                <svg className='w-full h-full' fill='none' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                  <line stroke='#00f0ff' strokeLinecap='round' strokeWidth='5' x1='50' x2='50' y1='28' y2='70'></line>
                  <path d='M50 70 Q42 50 32 34' stroke='#00e5ff' strokeLinecap='round' strokeWidth='7'></path>
                  <path d='M50 70 Q38 58 29 45' stroke='#38bdf8' strokeLinecap='round' strokeWidth='4.5'></path>
                  <path d='M50 70 Q32 65 24 55' stroke='#38bdf8' strokeLinecap='round' strokeWidth='3'></path>
                  <path d='M50 70 Q58 50 68 34' stroke='#38bdf8' strokeLinecap='round' strokeWidth='7'></path>
                  <path d='M50 70 Q62 58 72 45' stroke='#a855f7' strokeLinecap='round' strokeWidth='5.5'></path>
                  <path d='M50 70 Q68 65 77 55' stroke='#c084fc' strokeLinecap='round' strokeWidth='3.5'></path>
                  <circle cx='50' cy='70' fill='#ffffff' filter='drop-shadow(0 0 4px #00f0ff)' r='4.5'></circle>
                  <circle cx='68' cy='34' fill='#f43f5e' r='2.5'></circle>
                </svg>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-[17px] tracking-tight text-white'>
                  Vibe<span className='text-[#1d9bf0]'>On</span>
                </span>
              </div>
            </div>
            <div className='flex items-center gap-1 px-3 py-1 rounded-full bg-[#252a30] text-[#bfc7d3] text-[12px] font-medium'>
              <span className='material-symbols-outlined text-[13px] text-[#4adf9d]'>verified_user</span>
              <span>BẢO MẬT & XÁC THỰC</span>
            </div>
          </div>

          {/* Hero Icon */}
          <div className='relative my-6 flex items-center justify-center'>
            <div className='absolute w-36 h-36 rounded-full bg-[#1d9bf0]/10 filter blur-xl'></div>
            <div className='relative w-24 h-24 rounded-full bg-[#1b2025] flex items-center justify-center shadow-lg'>
              <span className='absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[#30353b] text-[#4adf9d] text-[11px] font-medium flex items-center gap-1 shadow-sm'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#4adf9d] animate-pulse'></span>
                SES ĐÃ GỬI
              </span>
              <svg className='absolute inset-0 w-full h-full pointer-events-none' viewBox='0 0 100 100'>
                <circle
                  cx='50'
                  cy='50'
                  fill='none'
                  r='46'
                  stroke='#99cbff'
                  strokeDasharray='3 4'
                  strokeOpacity='0.15'
                  strokeWidth='1.5'
                ></circle>
                <circle
                  cx='50'
                  cy='50'
                  fill='none'
                  r='38'
                  stroke='#ffb1c5'
                  strokeOpacity='0.2'
                  strokeWidth='1'
                ></circle>
              </svg>
              <div className='w-12 h-12 rounded-full bg-[#1d9bf0]/20 flex items-center justify-center text-[#1d9bf0]'>
                <span className='material-symbols-outlined text-[30px]' style={{ fontVariationSettings: "'FILL' 1" }}>
                  mark_email_read
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          {/* <h1 className='text-[24px] font-bold text-white mb-1'>Tài khoản đã tạo thành công!</h1> */}
          <h1 className='text-[24px] font-bold text-white mb-1'>
            {verifyMutation.isSuccess && 'Xác thực thành công!'}
            {!token && 'Tài khoản đã tạo thành công!'} {/* Trường hợp không có token */}
          </h1>
          <p className='text-[15px] text-[#bfc7d3] max-w-sm mb-6'>
            {verifyMutation.isSuccess &&
              'Tuyệt vời! Email của bạn đã được xác minh. Bây giờ bạn có thể đăng nhập và bắt đầu trải nghiệm VibeOn.'}
            {!token &&
              'Để bảo mật thông tin, chúng tôi đã gửi một email xác nhận đến địa chỉ bên dưới. Vui lòng mở hộp thư và bấm nút kích hoạt tài khoản.'}
          </p>

          {/* Email Box */}
          <div className='w-full bg-[#1b2025] px-4 py-3 rounded-full flex items-center justify-between gap-2 mb-6'>
            <div className='flex items-center gap-2 min-w-0'>
              <span className='material-symbols-outlined text-[#1d9bf0] text-[18px]'>alternate_email</span>
              <span className='text-[14px] font-semibold text-white truncate'>{email}</span>
            </div>
            <button
              onClick={handleCopy}
              className='px-2 py-1 rounded-full text-[#bfc7d3] hover:text-white hover:bg-[#252a30] transition-colors flex items-center gap-1 text-[12px] font-medium'
            >
              <span className='material-symbols-outlined text-[15px]'>content_copy</span>
              <span>Sao chép</span>
            </button>
          </div>

          {/* Action Buttons */}
          {verifyMutation.isSuccess ? (
            <div className='flex flex-col w-full gap-2 mb-6'>
              <Link
                to='/login'
                className='w-full h-11 px-4 rounded-full bg-[#1d9bf0] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md hover:brightness-110'
              >
                <span className='material-symbols-outlined text-[20px]'>login</span>
                <span>Chuyển sang Đăng nhập ngay</span>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col w-full gap-2 mb-6'>
              <a
                href='https://mail.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full h-11 px-4 rounded-full bg-[#1d9bf0] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md hover:brightness-110'
              >
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'></path>
                </svg>
                <span>Mở Gmail ngay</span>
                <span className='material-symbols-outlined text-[16px]'>open_in_new</span>
              </a>
            </div>
          )}

          {/* Resend Section */}
          <div className='w-full bg-[#0a0f14] p-4 rounded-xl flex flex-col items-center text-center gap-1 mb-6'>
            <div className='flex items-center gap-1.5 text-[#bfc7d3] text-[13px]'>
              <span className='material-symbols-outlined text-[16px] text-[#89919d]'>help_outline</span>
              <span>Chưa nhận được thư? Kiểm tra hòm thư rác (Spam) </span>
            </div>
            {/* <div className='flex items-center gap-2'>
              <button
                onClick={() => resendMutation.mutate()}
                disabled={!canResend}
                className={`font-semibold text-[14px] transition-colors flex items-center gap-1 ${
                  canResend ? 'text-[#1d9bf0] hover:underline cursor-pointer' : 'text-[#89919d] cursor-not-allowed'
                }`}
              >
                <span className='material-symbols-outlined text-[16px]'>sync</span>
                <span>{verifyMutation.isSuccess ? '' : 'Gửi lại email xác thực'}</span>
              </button>
              {isRunning &&
                !verifyMutation.isSuccess(
                  <span className='px-2 py-0.5 rounded-full bg-[#1b2025] text-[#1d9bf0] text-[12px] font-medium'>
                    sau {secondsLeft}s
                  </span>
                )}
            </div> */}
            {/* Nút Gửi lại (chỉ hiện khi chưa thành công) */}
            {!verifyMutation.isSuccess && (
              <>
                <button
                  onClick={() => resendMutation.mutate()}
                  disabled={!canResend}
                  className={`font-semibold text-[14px] transition-colors flex items-center gap-1 ${
                    canResend ? 'text-[#1d9bf0] hover:underline cursor-pointer' : 'text-[#89919d] cursor-not-allowed'
                  }`}
                >
                  <span className='material-symbols-outlined text-[16px]'>sync</span>
                  <span>{resendMutation.isPending ? 'Đang gửi...' : 'Gửi lại email xác thực'}</span>
                </button>

                {/* Đồng hồ đếm ngược */}
                {isRunning && (
                  <span className='px-2 py-0.5 rounded-full bg-[#1b2025] text-[#1d9bf0] text-[12px] font-medium'>
                    sau {secondsLeft}s
                  </span>
                )}
              </>
            )}
          </div>

          {/* Stepper */}
          <div className='w-full pt-1 pb-2'>
            <div className='flex items-center justify-between w-full px-2 relative'>
              {/* Thanh nối (Line) */}
              <div
                className={`absolute left-6 right-6 top-3 h-0.5 transition-colors duration-300 ${
                  verifyMutation.isSuccess ? 'bg-[#01ba7c]' : 'bg-[#30353b]'
                } -z-0`}
              ></div>

              {/* Bước 1: Đăng ký (Luôn hoàn thành) */}
              <div className='flex flex-col items-center gap-1 relative z-10'>
                <div className='w-6 h-6 rounded-full bg-[#01ba7c] text-[#00432a] flex items-center justify-center text-[12px]'>
                  <span className='material-symbols-outlined text-[14px] font-bold'>check</span>
                </div>
                <span className='text-[11px] text-[#bfc7d3]'>Đăng ký</span>
              </div>

              {/* Bước 2: Kiểm tra thư */}
              <div className='flex flex-col items-center gap-1 relative z-10'>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors duration-300 ${
                    verifyMutation.isSuccess
                      ? 'bg-[#01ba7c] text-[#00432a]'
                      : 'bg-[#1d9bf0] text-white ring-2 ring-[#1d9bf0]/40'
                  }`}
                >
                  {verifyMutation.isSuccess ? (
                    <span className='material-symbols-outlined text-[14px] font-bold'>check</span>
                  ) : (
                    '2'
                  )}
                </div>
                <span
                  className={`text-[11px] transition-colors duration-300 ${
                    verifyMutation.isSuccess ? 'text-[#bfc7d3]' : 'text-[#1d9bf0] font-bold'
                  }`}
                >
                  Kiểm tra thư
                </span>
              </div>

              {/* Bước 3: Bắt đầu Vibe */}
              <div className='flex flex-col items-center gap-1 relative z-10'>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors duration-300 ${
                    verifyMutation.isSuccess ? 'bg-[#01ba7c] text-[#00432a]' : 'bg-[#30353b] text-[#bfc7d3]'
                  }`}
                >
                  {verifyMutation.isSuccess ? (
                    <span className='material-symbols-outlined text-[14px] font-bold'>check</span>
                  ) : (
                    '3'
                  )}
                </div>
                <span
                  className={`text-[11px] transition-colors duration-300 ${
                    verifyMutation.isSuccess ? 'text-[#01ba7c] font-bold' : 'text-[#89919d]'
                  }`}
                >
                  Bắt đầu Vibe
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-center gap-4 pt-4 w-full'>
            <Link
              to='/register'
              className='text-[12px] font-medium text-[#bfc7d3] hover:text-white flex items-center gap-1 transition-colors'
            >
              <span className='material-symbols-outlined text-[14px]'>edit</span>
              <span>Đổi địa chỉ email</span>
            </Link>
            <span className='w-1 h-1 rounded-full bg-[#3f4851]'></span>
            <Link
              to='/login'
              className='text-[12px] font-medium text-[#1d9bf0] hover:underline flex items-center gap-1 transition-colors'
            >
              <span className='material-symbols-outlined text-[14px]'>arrow_back</span>
              <span>Quay lại Đăng nhập</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
