'use client';

import { useState, useEffect } from "react";

import { AnimatePresence, motion } from "motion/react";

export const HomeScrim = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted])
  
  return (
    <AnimatePresence>
      {!mounted ? (
        <motion.div
          key="home-scrim"
          aria-hidden="true"
          className="fixed inset-0 w-full h-screen bg-black z-[9999] text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
        />
      ) : null}
    </AnimatePresence>
  ) 
}