'use client';

import { useEffect } from "react";
import { useSiteStore } from "@/stores/use-site-store";

import { AnimatePresence, motion } from "motion/react";

export const HomeScrim = () => {
  const setHasMounted = useSiteStore(state => state.setHasMounted);
  const hasMounted = useSiteStore(state => state.hasMounted);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted])
  
  return (
    <AnimatePresence>
      {!hasMounted ? (
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