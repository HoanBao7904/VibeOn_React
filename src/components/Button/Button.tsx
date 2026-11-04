import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoding?: boolean
}

export default function Button(props: ButtonProps) {
  const { isLoding, onClick, className, children, ...rest } = props
  return (
    <button onClick={onClick} className={className} {...rest}>
      {isLoding ? (
        <svg className='w-5 h-5' fill='hsl(228, 97%, 42%)' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <rect x='1' y='4' width='6' height='14' opacity='1'>
            <animate
              id='spinner_aqiq'
              begin='0;spinner_xVBj.end-0.25s'
              attributeName='y'
              dur='0.75s'
              values='1;5'
              fill='freeze'
            />
            <animate begin='0;spinner_xVBj.end-0.25s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='0;spinner_xVBj.end-0.25s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
          <rect x='9' y='4' width='6' height='14' opacity='.4'>
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='y' dur='0.75s' values='1;5' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.15s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
          <rect x='17' y='4' width='6' height='14' opacity='.3'>
            <animate
              id='spinner_xVBj'
              begin='spinner_aqiq.begin+0.3s'
              attributeName='y'
              dur='0.75s'
              values='1;5'
              fill='freeze'
            />
            <animate begin='spinner_aqiq.begin+0.3s' attributeName='height' dur='0.75s' values='22;14' fill='freeze' />
            <animate begin='spinner_aqiq.begin+0.3s' attributeName='opacity' dur='0.75s' values='1;.2' fill='freeze' />
          </rect>
        </svg>
      ) : children ? (
        <span>{children}</span>
      ) : (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
          ></path>
        </svg>
      )}
      {/* {!children && (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
          ></path>
        </svg>
      )}
      {children && <span>{children}</span>} */}
    </button>
  )
}
