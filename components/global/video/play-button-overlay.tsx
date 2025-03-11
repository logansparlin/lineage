'use client'

import { type FC } from 'react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'framer-motion';
import { Play } from 'react-feather';

interface PlayButtonOverlayProps extends HTMLMotionProps<'button'> {
  hidden?: boolean
}

export const PlayButtonOverlay: FC<PlayButtonOverlayProps> = ({ hidden = false, ...rest }) => {
  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.button
          className="cursor-pointer absolute-center w-54 md:w-120 h-36 md:h-80 border-[1.5px] md:border-2 border-white rounded-full z-[2] flex-center bg-transparent all-interactions:bg-step-200 all-interactions:border-step-200 transition-colors duration-400 ease"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          {...rest}
        >
          <Play color={'var(--color-white)'} fill={'var(--color-white)'} className="h-[50%] ml-4 w-auto" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

