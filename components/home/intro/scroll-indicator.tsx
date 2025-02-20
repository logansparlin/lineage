'use client';

import { ComponentProps, useState, type FC } from "react";
import { useLenis } from "lenis/react";

import { AnimatePresence, motion } from "motion/react";

interface ScrollIndicatorProps extends ComponentProps<'div'> {}

export const ScrollIndicator: FC<ScrollIndicatorProps> = (props) => {
  const [scrolled, setScrolled] = useState(false);

  useLenis(({ scroll }) => {
    if (scroll > 100) setScrolled(true);
    if (scroll < 100) setScrolled(false);
  })

  return (
    <AnimatePresence initial={false}>
      {!scrolled ? (
        <motion.div
          className="fixed bottom-40 left-1/2 -translate-x-1/2 z-[10] text-off-white opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          scroll ↓
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}