import { type FC, type ComponentProps } from 'react';
import { cva } from 'class-variance-authority';
import { Pause } from 'react-feather';

interface PauseButtonProps extends ComponentProps<'button'> {
  isPlaying: boolean
}

const pauseButtonStyles = cva('cursor-pointer w-24 h-24 flex-center transition-colors duration-400 ease', {
  variants: {
    isPlaying: {
      true: 'text-white all-interactions:text-step-200',
      false: 'text-step-200'
    }
  }
})

export const PauseButton: FC<PauseButtonProps> = ({ isPlaying, ...rest }) => {
  return (
    <button className={pauseButtonStyles({ isPlaying })} disabled={!isPlaying} {...rest}>
      <span className="sr-only">Pause</span>
      <Pause fill="currentColor" className="h-18 w-auto"></Pause>
    </button>
  )
}

