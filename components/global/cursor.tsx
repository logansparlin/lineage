'use client'

import { memo, useCallback, useEffect, useRef, useState, type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { useRafLoop, useMedia } from 'react-use'

import { IconCursorMorph } from "../icons/icon-cursor-morph";

interface CursorProps {
  hidden?: boolean;
}

export const Cursor: FC<CursorProps> = memo(() => {
  const [currentStep, setCurrentStep] = useState(1)
  const [hasMoved, setHasMoved] = useState(false)
  const isTouch = useMedia('(pointer: coarse)', false)

  const cursorHidden = useSiteStore(state => state.cursorHidden)
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const cursorPos = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 }
  })

  useRafLoop(() => {
    if (!cursorRef.current || isTouch) return

    const elW = cursorRef.current?.offsetWidth
    const elH = cursorRef.current?.offsetHeight

    cursorRef.current.style.transform = `translate(${cursorPos.current.target.x - (elW / 2)}px, ${cursorPos.current.target.y - (elH / 2)}px)`
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!hasMoved) {
      setHasMoved(true)
    }

    cursorPos.current.target.x = e.clientX
    cursorPos.current.target.y = e.clientY
  }, [hasMoved])

  const handleClick = useCallback((e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.85
      audioRef.current.play()
    }

    setCurrentStep(prev => prev === 4 ? 1 : prev + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || isTouch) return
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      if (typeof window === 'undefined') return
      
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="will-change-transform site-cursor origin-center fixed top-0 w-40 left-0 z-[9999] pointer-events-none cursor-none text-nav hidden md:block text-center text-white"
    >
      <audio ref={audioRef} src="/click.mp3" autoPlay={false} />
      <div className={`relative h-20 w-auto text-off-white transition-opacity duration-300 ease ${cursorHidden || !hasMoved ? 'opacity-0' : 'opacity-100'}`}>
        <IconCursorMorph step={currentStep} className="h-full w-auto" />
      </div>
    </div>
  );
});
