import { type FC, type ComponentProps } from 'react'

interface BlurredBackgroundProps extends ComponentProps<'div'> {}

export const BlurredBackground: FC<BlurredBackgroundProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80%] h-full aspect-square rotate-45 shadow-current bg-current" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[80%] h-full aspect-square rotate-45 shadow-current bg-current" />
    </div>
  )
}