'use client'

import { useCallback, useEffect, useRef, useState, type FC, cloneElement } from "react";
import { useRafLoop, useMeasure } from 'react-use'
import { lerp } from "@/lib/lerp";

import { AnimatePresence, motion } from "framer-motion";
import { IconCursorMorph } from "../icons/icon-cursor-morph";

interface CursorProps {
  hidden?: boolean;
}

const DAMPING = 0.15

export const Cursor: FC<CursorProps> = (props) => {
  const { hidden = false } = props;
  const [currentStep, setCurrentStep] = useState(1)
  
  const cursorRef = useRef<HTMLDivElement>(null)

  const cursorPos = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 }
  })

  const [stopLoop, startLoop] = useRafLoop(() => {
    if (!cursorRef.current) return

    const elW = cursorRef.current?.offsetWidth
    const elH = cursorRef.current?.offsetHeight

    cursorPos.current.current.x = lerp({ start: cursorPos.current.current.x, end: cursorPos.current.target.x, time: DAMPING })
    cursorPos.current.current.y = lerp({ start: cursorPos.current.current.y, end: cursorPos.current.target.y, time: DAMPING })

    cursorRef.current.style.transform = `translate(${cursorPos.current.current.x - (elW / 2)}px, ${cursorPos.current.current.y - (elH / 2)}px)`
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorPos.current.target.x = e.clientX
    cursorPos.current.target.y = e.clientY
  }, [])

  useEffect(() => {
    if (!hidden) {
      stopLoop()
      startLoop()
    }
  }, [hidden])

  useEffect(() => {
    return () => {
      stopLoop()
    }
  }, [])

  const handleClick = useCallback(() => {
    setCurrentStep(prev => prev === 4 ? 1 : prev + 1)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 w-40 left-0 z-[50] pointer-events-none cursor-none text-nav hidden md:grid grid-contain text-center place-items-center text-white"
      initial={{ opacity: hidden ? 0 : 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45 }}
    >
      <AnimatePresence>
        <motion.div
          key="cursor"
          className="relative will-change-transform origin-center h-24 w-auto text-off-white"
          initial={{ opacity: 0, y: '90%', scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '-90%', scale: 0.8 }}
          transition={{ duration: 0.65 }}
        >
          <IconCursorMorph step={currentStep} className="h-full w-auto" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
