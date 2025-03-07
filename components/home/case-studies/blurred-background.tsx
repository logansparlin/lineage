import { type FC, type ComponentProps } from 'react'

interface BlurredBackgroundProps extends ComponentProps<'div'> {}

export const BlurredBackground: FC<BlurredBackgroundProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <svg className="w-full h-full blur-[26px] scale-x-[1.3] origin-center transform-gpu will-change-auto" width="1936" height="1482" viewBox="0 0 1936 1482" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#triangle-blur-top)">
          <path d="M968 741L1802 134H134L968 741Z" fill="currentColor"/>
        </g>
        <g filter="url(#triangle-blur-bottom)">
          <path d="M968 741L134 1348L1802 1348L968 741Z" fill="currentColor"/>
        </g>
        
        {/* <defs>
          <filter id="triangle-blur-top" x="0" y="0" width="1936" height="875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_34_369"/>
          </filter>
          <filter id="triangle-blur-bottom" x="0" y="607" width="1936" height="875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_34_369"/>
          </filter>
        </defs> */}
      </svg>

    </div>
  )
}