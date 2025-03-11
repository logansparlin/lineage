import { type FC, type ComponentProps } from 'react'

interface BlurredBackgroundProps extends ComponentProps<'div'> {}

export const BlurredBackground: FC<BlurredBackgroundProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <svg className="relative w-full h-full scale-y-[2.75] scale-x-[2] md:scale-y-[1] md:scale-x-[1.3] origin-center" width="1936" height="1482" viewBox="0 0 1936 1482" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M968 741L1802 134H134L968 741Z" fill="currentColor"/>
        </g>
        <g>
          <path d="M968 741L134 1348L1802 1348L968 741Z" fill="currentColor"/>
        </g>
      </svg>

    </div>
  )
}