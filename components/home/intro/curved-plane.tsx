import { type FC, useMemo, useRef, type RefObject, RefCallback } from 'react'
import { Color, Object3D, Vector2, Vector3 } from 'three'

interface CurvedPlaneProps {
  name?: string;
  aspectRatio?: number;
  segments?: number;
  width?: number;
  height?: number;
  curveIntensity?: number;
  outer?: string;
  inner?: string;
  innerNext?: string;
  outerNext?: string;
  center?: string;
  ref?: RefCallback<Object3D>;
  scale?: Vector3;
  position?: Vector3;
  inset?: number;
}

export const CurvedPlane: FC<CurvedPlaneProps> = ({ 
  ref,
  name,
  aspectRatio = 1,
  segments = 128,
  width = 10,
  height = 10,
  curveIntensity = 3,
  outer = "#FE9807",
  inner = "#F44318",
  center = '#FFFFFF',
  innerNext = "#000000",
  outerNext = "#000000",
  position = new Vector3(0, 0, 0),
  scale = new Vector3(1, 1, 1),
  inset = 0.85
}) => {
  const innerColor = useMemo(() => new Color(outer).convertLinearToSRGB(), [outer])
  const outerColor = useMemo(() => new Color(inner).convertLinearToSRGB(), [inner])
  const centerColor = useMemo(() => center ? new Color(center).convertLinearToSRGB() : null, [center])

  const innerColorNext = useMemo(() => new Color(innerNext).convertLinearToSRGB(), [innerNext])
  const outerColorNext = useMemo(() => new Color(outerNext).convertLinearToSRGB(), [outerNext])

  return (
    <mesh key="plane" ref={ref} scale={scale} position={position} name={name}>
      <planeGeometry args={[width, height, segments, segments]} />
      {/* @ts-ignore */}
      <boxGradient
        inset={inset}
        innerColor={innerColor}
        outerColor={outerColor}
        centerColor={centerColor}
        innerColorNext={innerColorNext}
        outerColorNext={outerColorNext}
        aspect={aspectRatio}
        size={new Vector2(width, height)}
        curveIntensity={curveIntensity}
      />
    </mesh>
  )
}