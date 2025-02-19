import React, { useMemo, useRef } from 'react'
import { Color, Vector2 } from 'three'

export const CurvedPlane = ({ 
  aspectRatio = 1,
  scale = 1,
  segments = 128,
  width = 10,
  height = 10,
  curveIntensity = 3,
  outer = "#FE9807",
  inner = "#F44318",
  ref
}) => {
  const meshRef = useRef<any>(null);

  const colorOne = useMemo(() => new Color(outer).convertLinearToSRGB(), [outer])
  const colorTwo = useMemo(() => new Color(inner).convertLinearToSRGB(), [inner])

  return (
    <mesh ref={ref} scale={[0, 0, 0]}>
      <planeGeometry args={[width, height, segments, segments]} />
      {/* @ts-ignore */}
      <boxGradient
        colorOne={colorOne}
        colorTwo={colorTwo}
        size={new Vector2(width, height)}
        aspect={aspectRatio}
        curveIntensity={curveIntensity}
      />
    </mesh>
  )
}