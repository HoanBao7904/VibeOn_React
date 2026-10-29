import { useState, type InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  errorMessage?: string
  icon?: string
}

export default function Input({ register, name, errorMessage, className, icon, ...rest }: Props) {
  const [openEye, setOpenEye] = useState(false)

  // Đã thêm rules vào đây
  const registerResult = register && name ? register(name) : {}

  // Hàm đổi type (text <-> password)
  const currentType = rest.type === 'password' && openEye ? 'text' : rest.type || 'text'

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='relative flex items-center'>
        <input
          {...registerResult}
          name={name}
          {...rest} // Bung các props (placeholder, type...)
          type={currentType} // Ghi đè type động
          className={`w-full bg-gray-800 pl-4 pr-11 py-2.5 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-150 text-[15px] ${className || ''}`}
        />

        {/* Chỉ hiện icon nếu là ô password */}
        {rest.type === 'password' ? (
          <button
            type='button'
            onClick={() => setOpenEye(!openEye)}
            className='absolute right-4 text-gray-400 hover:text-white p-1 transition-colors'
          >
            <span className='material-symbols-outlined text-[20px]'>{openEye ? 'visibility' : 'visibility_off'}</span>
          </button>
        ) : (
          <span className='material-symbols-outlined text-gray-400 text-[20px] absolute right-4 pointer-events-none'>
            {icon}
          </span>
        )}
      </div>

      {/* Hiển thị lỗi */}
      {errorMessage && <p className='text-xs text-red-500 mt-1 px-2'>{errorMessage}</p>}
    </div>
  )
}
