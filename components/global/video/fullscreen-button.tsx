import { type FC, type ComponentProps } from 'react';
import { Maximize } from 'react-feather';

interface FullscreenButtonProps extends ComponentProps<'button'> {}

export const FullscreenButton: FC<FullscreenButtonProps> = (rest) => {
  return (
    <button className="cursor-pointer w-24 h-24 flex-center text-white all-interactions:text-step-200 transition-colors duration-400 ease" {...rest}>
      <span className="sr-only">Enter fullscreen</span>
      <Maximize fill="var(--color-white)" className="h-18 w-auto"></Maximize>
    </button>
  )
}

