import { type FC, useMemo, useRef, type RefObject, RefCallback } from 'react'
import { Color, Object3D, Vector2, Vector3 } from 'three'

interface CurvedPlaneProps {
  aspectRatio?: number;
  segments?: number;
  width?: number;
  height?: number;
  curveIntensity?: number;
  outer?: string;
  inner?: string;
  center?: string;
  ref?: RefCallback<Object3D>;
  scale?: Vector3;
  position?: Vector3;
  inset?: number;
}

export const CurvedPlane: FC<CurvedPlaneProps> = ({ 
  ref,
  aspectRatio = 1,
  segments = 128,
  width = 10,
  height = 10,
  curveIntensity = 3,
  outer = "#FE9807",
  inner = "#F44318",
  center = '#FFFFFF',
  position = new Vector3(0, 0, 0),
  scale = new Vector3(1, 1, 1),
  inset = 0.85
}) => {
  const colorOne = useMemo(() => new Color(outer).convertLinearToSRGB(), [outer])
  const colorTwo = useMemo(() => new Color(inner).convertLinearToSRGB(), [inner])
  const colorThree = useMemo(() => center ? new Color(center).convertLinearToSRGB() : null, [center])

  return (
    <mesh ref={ref} scale={scale} position={position}>
      <planeGeometry args={[width, height, segments, segments]} />
      {/* @ts-ignore */}
      <boxGradient
        inset={inset}
        colorOne={colorOne}
        colorTwo={colorTwo}
        colorThree={colorThree}
        aspect={aspectRatio}
        size={new Vector2(width, height)}
        curveIntensity={curveIntensity}
      />
    </mesh>
  )
}