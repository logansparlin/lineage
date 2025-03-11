'use client'

import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { useRafLoop } from 'react-use'

import { AnimatePresence, motion } from "framer-motion";
import { IconCursorMorph } from "../icons/icon-cursor-morph";

interface CursorProps {
  hidden?: boolean;
}

export const Cursor: FC<CursorProps> = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const cursorHidden = useSiteStore(state => state.cursorHidden)
  
  const cursorRef = useRef<HTMLDivElement>(null)

  const cursorPos = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 }
  })

  const [stopLoop, startLoop] = useRafLoop(() => {
    if (!cursorRef.current) return

    const elW = cursorRef.current?.offsetWidth
    const elH = cursorRef.current?.offsetHeight

    // cursorPos.current.current.x = lerp({ start: cursorPos.current.current.x, end: cursorPos.current.target.x, time: DAMPING })
    // cursorPos.current.current.y = lerp({ start: cursorPos.current.current.y, end: cursorPos.current.target.y, time: DAMPING })
    cursorPos.current.current.x = cursorPos.current.target.x
    cursorPos.current.current.y = cursorPos.current.target.y

    cursorRef.current.style.transform = `translate3d(${cursorPos.current.current.x - (elW / 2)}px, ${cursorPos.current.current.y - (elH / 2)}px, 0)`
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorPos.current.target.x = e.clientX
    cursorPos.current.target.y = e.clientY
  }, [])

  useEffect(() => {
    if (cursorHidden) {
      stopLoop()
    } else {
      startLoop()
    }
  }, [cursorHidden])

  useEffect(() => {
    return () => {
      stopLoop()
    }
  }, [])

  const handleClick = useCallback(() => {
    setCurrentStep(prev => prev === 4 ? 1 : prev + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      if (typeof window === 'undefined') return
      
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className="site-cursor origin-center fixed top-0 w-40 left-0 z-[50] pointer-events-none cursor-none text-nav hidden md:grid grid-contain text-center place-items-center text-white will-change-transform"
    >
      <AnimatePresence>
        {!cursorHidden ? (
          <motion.div
            key="cursor"
            className="relative will-change-transform origin-center h-20 w-auto text-off-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconCursorMorph step={currentStep} className="h-full w-auto" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};
