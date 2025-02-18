import React, { useRef } from 'react'
import { Color, Vector2 } from 'three'

export const CurvedPlane = ({ 
  aspectRatio = 1,
  scale = 1,
  segments = 128,
  width = 10,
  height = 10,
  curveIntensity = 3
}) => {
  const meshRef = useRef<any>(null);

  return (
    <mesh scale={[scale, scale, 1]} ref={meshRef}>
      <planeGeometry args={[width, height, segments, segments]} />
      {/* @ts-ignore */}
      <boxGradient
        colorOne={new Color("#FE9807")}
        colorTwo={new Color("#F44318")}
        size={new Vector2(width, height)}
        aspect={aspectRatio}
        curveIntensity={curveIntensity}
      />
    </mesh>
  )
}