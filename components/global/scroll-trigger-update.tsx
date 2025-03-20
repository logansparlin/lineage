'use client'

import { useLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'


export const ScrollTriggerUpdate = () => {
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [lenis])

  return null
}