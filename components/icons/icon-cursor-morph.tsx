'use client'

import { type FC, type ComponentProps, useRef } from 'react'

import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(MorphSVGPlugin, useGSAP)

// 1: Circle, 2: Ellipse, 3: Sun, 4: Star
const svgPaths: Record<number, string> = {
  1: 'M4.299999999999999,12.7a12.1,12.1 0 1,0 24.2,0a12.1,12.1 0 1,0 -24.2,0',
  2: 'M0,12.7a16.4,11.4 0 1,0 32.8,0a16.4,11.4 0 1,0 -32.8,0',
  3: 'M15,0.9c0.6-1.2,2.3-1.2,2.9,0l1.2,2.6c0.3,0.7,1.2,1.1,2,0.8l2.7-1c1.3-0.5,2.5,0.8,2,2l-1,2.7c-0.3,0.8,0.1,1.6,0.8,2l2.6,1.2c1.2,0.6,1.2,2.3,0,2.9l-2.6,1.2c-0.7,0.3-1.1,1.2-0.8,2l1,2.7c0.5,1.3-0.8,2.5-2,2l-2.7-1c-0.8-0.3-1.6,0.1-2,0.8l-1.2,2.6c-0.6,1.2-2.3,1.2-2.9,0l-1.2-2.6c-0.3-0.7-1.2-1.1-2-0.8l-2.7,1c-1.3,0.5-2.5-0.8-2-2l1-2.7c0.3-0.8-0.1-1.6-0.8-2l-2.6-1.2c-1.2-0.6-1.2-2.3,0-2.9l2.6-1.2c0.7-0.3,1.1-1.2,0.8-2l-1-2.7c-0.5-1.3,0.8-2.5,2-2l2.7,1c0.8,0.3,1.6-0.1,2-0.8L15,0.9z',
  4: 'M26.8,10.7C23.1,9,20.2,6,18.4,2.3c-0.6-1.2-1.3-1.9-2-1.9c-0.7,0-1.4,0.7-2,1.9C12.7,6,9.7,9,6.1,10.7c-1.2,0.6-1.9,1.3-1.9,2s0.7,1.4,1.9,2c3.7,1.8,6.6,4.7,8.4,8.4c0.6,1.2,1.3,1.9,2,1.9c0.7,0,1.4-0.7,2-1.9c1.8-3.7,4.7-6.6,8.4-8.4c1.2-0.6,1.9-1.3,1.9-2S28,11.3,26.8,10.7z'
}

interface IconCursorMorphProps extends ComponentProps<'svg'> {
  step: number
}

export const IconCursorMorph: FC<IconCursorMorphProps> = ({ step, ...props }) => {
  const pathRef = useRef<SVGPathElement>(null)

  useGSAP(() => {
    gsap.to(pathRef.current, {
      duration: 0.65,
      ease: 'elastic.out(1, 0.75)',
      morphSVG: svgPaths[step]
    })
  }, {
    scope: pathRef,
    dependencies: [step]
  })

  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.8 25.4" {...props}>
      <path ref={pathRef} d={svgPaths[1]} fill="currentColor" />
  </svg>

  )
}