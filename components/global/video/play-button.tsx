import { type FC, type ComponentProps } from 'react';
import { cva } from 'class-variance-authority';
import { Play } from 'react-feather';

interface PlayButtonProps extends ComponentProps<'button'> {
  isPlaying: boolean
}

const playButtonStyles = cva('cursor-pointer w-20 h-20 md:w-24 md:h-24 flex-center transition-colors duration-400 ease', {
  variants: {
    isPlaying: {
      true: 'text-step-200',
      false: 'text-off-white all-interactions:text-step-200'
    }
  }
})

export const PlayButton: FC<PlayButtonProps> = ({ isPlaying, ...rest }) => {
  return (
    <button className={playButtonStyles({ isPlaying })} disabled={isPlaying} {...rest}>
      <span className="sr-only">Play</span>
      <Play fill="currentColor" className="h-16 md:h-18 w-auto"></Play>
    </button>
  )
}

