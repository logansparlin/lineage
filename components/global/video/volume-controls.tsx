'use client';

import { type FC, type ComponentProps, useState } from 'react';
import { cva } from 'class-variance-authority';

import { AnimatePresence, motion } from 'framer-motion';
import { VolumeIcon } from './volume-icon';
import { Root as SliderRoot, Range, Track, Thumb } from '@radix-ui/react-slider';

interface VolumeControlsProps extends ComponentProps<'button'> {
  isMuted: boolean
  volume: number
  setVolume: (volume: number) => void
}

const volumeControlsStyles = cva('cursor-pointer w-20 h-20 md:w-24 md:h-24 flex-center transition-colors duration-400 ease', {
  variants: {
    isMuted: {
      true: 'text-step-200',
      false: 'text-off-white all-interactions:text-step-200'
    }
  }
})

export const VolumeControls: FC<VolumeControlsProps> = ({ isMuted, volume, setVolume, ...rest }) => {
  const [rangeVisible, setRangeVisible] = useState(false)

  const handleMouseEnter = () => {
    setRangeVisible(true)
  }

  const handleMouseLeave = () => {
    setRangeVisible(false)
  }

  return (
    <div 
      className="relative max-md:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VolumeSlider visible={rangeVisible} volume={volume} setVolume={setVolume} />
      <button className={volumeControlsStyles({ isMuted })} {...rest}>
        <span className="sr-only">Volume</span>
        <VolumeIcon
          className="w-16 md:w-18 h-auto"
          isMuted={isMuted}
          volume={volume}
        />
      </button>
    </div>
  )
}

interface VolumeSliderProps {
  visible: boolean
  volume: number
  setVolume: (volume: number) => void
}

const VolumeSlider: FC<VolumeSliderProps> = ({ volume, visible = false, setVolume }) => {
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute z-[2] bottom-[calc(100%+12px)] left-0 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SliderRoot
            orientation="vertical"
            className="h-60 w-4 flex touch-none select-none items-center justify-center"
            defaultValue={[50]}
            min={0}
            max={1}
            value={[volume]}
            step={0.01}
            onValueChange={handleVolumeChange}
          >
            <Track className="relative h-full w-full bg-white/30 rounded-full overflow-hidden">
              <Range className="absolute h-full w-full rounded-full bg-step-200" />
            </Track>
            <Thumb
              className="block w-8 h-8 bg-transparent outline-none border-none focus:outline-none"
              aria-label="Volume"
            />
          </SliderRoot>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}