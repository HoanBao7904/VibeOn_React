import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'

import { useCountdown } from '~/hooks/useCountdown'
import { registerRules } from '~/rules/auth.rule'
import type { errorResponse } from '~/types/auth.type'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

const emailRule = registerRules.pick(['email'])

interface Formdata {
  email: string
}

const RESEND_COOLDOWN = 60

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<Formdata>({
    resolver: yupResolver(emailRule)
  })

  const emailValue = watch('email')

  const { isRunning, secondsLeft, start } = useCountdown(RESEND_COOLDOWN)

  useEffect(() => {
    start()
  }, [start])

  const forgotEmailMutation = useMutation({
    mutationFn: (body: Formdata) => authApi.forgotPassword(body)
  })

  const onSubmitForgotPassword = handleSubmit((data) => {
    forgotEmailMutation.mutate(data, {
      onSuccess: () => {
        toast.success('gửi email thành công')
        start()
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<errorResponse>(errors)) {
          const formErrors = errors.response?.data.error
          if (formErrors?.email) {
            setError('email', { message: formErrors.email.msg })
          }
        }
      }
    })
  })

  return (
    <div className='bg-[#0f1419] font-sans text-[#dee3ea] min-h-screen flex flex-col justify-between relative overflow-x-hidden selection:bg-[#1d9bf0] selection:text-[#003050]'>
      {/* Background Glows */}
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#1d9bf0]/10 blur-[130px] rounded-full'></div>
        <div className='absolute -bottom-32 right-1/4 w-[480px] h-[300px] bg-[#01ba7c]/10 blur-[140px] rounded-full'></div>
      </div>

      {/* Header */}
      <header className='relative z-10 w-full pt-8 pb-4 flex justify-center items-center'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full bg-[#1d9bf0] flex items-center justify-center shadow-[0_0_24px_rgba(29,155,240,0.35)]'>
            <span className='material-symbols-outlined text-[#003354] text-[20px] font-bold'>bolt</span>
          </div>
          <span className='text-[24px] font-bold tracking-tight text-white'>
            Vibe<span className='text-[#1d9bf0]'>On</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className='relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 py-6'>
        <div className='flex flex-col w-full items-center justify-center relative'>
          <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1d9bf0]/15 rounded-full blur-[110px] pointer-events-none'></div>

          <div className='w-full max-w-[520px] relative z-10 flex flex-col items-center'>
            {/* Card Frame */}
            <div className='w-full bg-[#171c21] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md'>
              <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1d9bf0] to-[#ff5693] opacity-85'></div>

              {/* Card Header */}
              <div className='flex flex-col items-center text-center'>
                <div className='relative w-20 h-20 mb-4 flex items-center justify-center'>
                  <div className='absolute inset-0 bg-[#1d9bf0]/20 rounded-2xl blur-md'></div>
                  <div className='w-20 h-20 rounded-2xl bg-[#0a0f14] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(29,155,240,0.15)]'>
                    {/* Logo SVG */}
                    <svg className='w-14 h-14' fill='none' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'>
                      <circle
                        cx='40'
                        cy='40'
                        opacity='0.3'
                        r='34'
                        stroke='#1d9bf0'
                        strokeDasharray='3 3'
                        strokeWidth='1.2'
                      ></circle>
                      <circle cx='40' cy='40' opacity='0.2' r='28' stroke='#ff5693' strokeWidth='0.8'></circle>
                      <path d='M40 18V56' opacity='0.9' stroke='#4adf9d' strokeLinecap='round' strokeWidth='2.5'></path>
                      <path
                        d='M26 30C28 42 34 56 40 58'
                        stroke='#1d9bf0'
                        strokeLinecap='round'
                        strokeWidth='4.5'
                      ></path>
                      <path
                        d='M23 42C25 50 32 58 37 60'
                        stroke='#99cbff'
                        strokeLinecap='round'
                        strokeWidth='2.5'
                      ></path>
                      <path
                        d='M20 48C22 55 28 60 33 61'
                        opacity='0.7'
                        stroke='#1d9bf0'
                        strokeLinecap='round'
                        strokeWidth='1.8'
                      ></path>
                      <path
                        d='M54 30C52 42 46 56 40 58'
                        stroke='#1d9bf0'
                        strokeLinecap='round'
                        strokeWidth='4.5'
                      ></path>
                      <path d='M57 42C55 50 48 58 43 60' stroke='#ff5693' strokeLinecap='round' strokeWidth='3'></path>
                      <path
                        d='M60 48C58 55 52 60 47 61'
                        opacity='0.7'
                        stroke='#ffb1c5'
                        strokeLinecap='round'
                        strokeWidth='1.8'
                      ></path>
                      <circle
                        className='animate-ping'
                        cx='40'
                        cy='58'
                        fill='#4adf9d'
                        r='3'
                        style={{ animationDuration: '3s' }}
                      ></circle>
                      <circle cx='40' cy='58' fill='#ffffff' r='2.5'></circle>
                      <circle cx='53.5' cy='30' fill='#ff5693' r='2'></circle>
                    </svg>
                  </div>
                </div>

                <div className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b2025] text-[#1d9bf0] text-[12px] font-medium mb-3 shadow-sm'>
                  <span className='material-symbols-outlined text-[17px] text-[#1d9bf0]'>verified_user</span>
                  <span className='tracking-wide font-bold uppercase'>BẢO MẬT TÀI KHOẢN • VIBE SHIELD</span>
                </div>

                <h1 className='text-[32px] leading-[36px] font-extrabold text-white mb-2 tracking-tight'>
                  Quên mật khẩu?
                </h1>
                <p className='text-[15px] text-[#bfc7d3] max-w-md leading-relaxed'>
                  Đừng lo lắng! Nhập địa chỉ email liên kết với tài khoản VibeOn của bạn. Hệ thống{' '}
                  <span className='text-white font-semibold'>Amazon SES</span> sẽ gửi cho bạn liên kết khôi phục an
                  toàn.
                </p>
              </div>

              {/* Dynamic Views */}
              <div className='mt-8 w-full'>
                {/* 1. FORM STATE */}

                {/* 2. SUCCESS STATE */}
                {forgotEmailMutation.isSuccess ? (
                  <div className='flex flex-col items-center text-center gap-4 transition-all duration-300 animate-fade-in'>
                    <div className='w-16 h-16 rounded-full bg-[#4adf9d]/15 flex items-center justify-center text-[#4adf9d] mb-1'>
                      <span
                        className='material-symbols-outlined text-[32px]'
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        mark_email_read
                      </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <h3 className='text-[24px] font-bold text-white'>Đã gửi liên kết thành công!</h3>
                      <p className='text-[15px] text-[#bfc7d3] max-w-sm'>
                        Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến hộp thư{' '}
                        <span className='text-[#1d9bf0] font-semibold'>{emailValue}</span>. Vui lòng kiểm tra hòm thư
                        đến và thư rác.
                      </p>
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-2'>
                      <a
                        className='w-full py-3 px-6 rounded-full bg-[#dee3ea] text-[#0a0f14] font-bold text-[15px] hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md'
                        href='https://mail.google.com'
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <span className='material-symbols-outlined text-[20px]'>open_in_new</span>
                        <span>Mở Gmail ngay</span>
                      </a>
                      <button
                        className={`w-full py-3 px-6 rounded-full font-semibold text-[14px] transition-all flex items-center justify-center gap-2 ${
                          isRunning
                            ? 'bg-[#1b2025] text-[#bfc7d3] cursor-not-allowed opacity-80'
                            : 'bg-[#1b2025] hover:bg-[#252a30] text-white'
                        }`}
                        disabled={isRunning}
                        onClick={() => forgotEmailMutation.mutate({ email: emailValue })} // Hoặc gọi API gửi lại riêng
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isRunning ? 'animate-spin' : ''}`}>
                          sync
                        </span>

                        <span>{isRunning ? `Gửi lại mã sau ${secondsLeft}s` : 'Gửi lại mã xác thực ngay'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className='flex flex-col gap-4 transition-all duration-300' onSubmit={onSubmitForgotPassword}>
                    <div className='flex flex-col gap-1'>
                      <label
                        className='text-[14px] font-semibold text-white flex items-center justify-between'
                        htmlFor='recovery-email'
                      >
                        <span>Địa chỉ Email</span>
                        <span className='text-[#89919d] text-[12px] font-medium'>Đã xác minh</span>
                      </label>
                      <div className='relative flex items-center'>
                        <span className='material-symbols-outlined absolute left-3 text-[#89919d] pointer-events-none'>
                          mail
                        </span>
                        {/* <Input
                        className='w-full bg-[#0a0f14] text-white placeholder:text-[#3f4851] rounded-full pl-11 pr-4 py-3 text-[15px] outline-none focus:bg-[#1b2025] transition-all'
                        register={register}
                        placeholder='hoanbao79@gmail.com'
                        type='email'
                        name='email'
                        errorMessage={errors.email?.message}
                      /> */}
                        <input
                          {...register('email')} // Bung register ra bằng dấu ...
                          type='email'
                          className='w-full bg-[#0a0f14] text-white placeholder:text-[#3f4851] rounded-full pl-11 pr-4 py-3 text-[15px] outline-none focus:bg-[#1b2025] transition-all'
                          name='email'
                          placeholder='hoanbao79@gmail.com'
                        />
                      </div>
                      {errors.email && (
                        <span className='text-red-500 text-[13px] px-2 mt-1'>{errors.email.message}</span>
                      )}
                    </div>

                    <button
                      className='w-full py-3 px-6 rounded-full bg-[#1d9bf0] text-white text-[15px] font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(29,155,240,0.35)] mt-2'
                      type='submit'
                    >
                      <span className='material-symbols-outlined text-[20px]'>outgoing_mail</span>
                      <span>Gửi liên kết khôi phục</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Sub-footer Links */}
              <div className='mt-8 pt-6 flex flex-col items-center gap-4 border-t border-[#30353b]'>
                <Link
                  className='flex items-center gap-1 text-[#1d9bf0] hover:text-[#99cbff] transition-colors font-semibold text-[14px] group'
                  to='/login'
                >
                  <span className='material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform'>
                    arrow_back
                  </span>
                  <span>
                    Nhớ lại mật khẩu?{' '}
                    <strong className='underline decoration-[#1d9bf0]/40 underline-offset-4 font-bold'>
                      Quay lại Đăng nhập
                    </strong>
                  </span>
                </Link>
                <div className='flex items-center gap-3 text-[#89919d] text-[12px]'>
                  <span>Cần hỗ trợ khẩn cấp?</span>
                  <a className='text-[#ffb1c5] hover:text-[#ffd9e1] transition-colors flex items-center gap-1' href='#'>
                    <span className='material-symbols-outlined text-[13px]'>contact_support</span>
                    <span>Liên hệ Vibe Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
