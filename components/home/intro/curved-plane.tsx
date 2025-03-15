import { type FC, useMemo, useRef, type RefObject, RefCallback } from 'react'
import { Color, Object3D, Vector2, Vector3 } from 'three'

interface CurvedPlaneProps {
  name?: string;
  aspectRatio?: number;
  segments?: number;
  width?: number;
  height?: number;
  curveIntensity?: number;
  curveProgress?: number;
  outer?: string;
  inner?: string;
  center?: string;
  ref?: RefCallback<Object3D>;
  scale?: Vector3;
  position?: Vector3;
  inset?: number;
  opacity?: number;
}

export const CurvedPlane: FC<CurvedPlaneProps> = ({ 
  ref,
  name,
  aspectRatio = 1,
  segments = 128,
  width = 10,
  height = 10,
  curveIntensity = 3,
  curveProgress = 0,
  outer = "#FE9807",
  inner = "#F44318",
  center = '#FFFFFF',
  position = new Vector3(0, 0, 0),
  scale = new Vector3(1, 1, 1),
  inset = 0.85,
  opacity = 1.0,
}) => {
  const innerColor = useMemo(() => new Color(outer).convertLinearToSRGB(), [outer])
  const outerColor = useMemo(() => new Color(inner).convertLinearToSRGB(), [inner])
  const centerColor = useMemo(() => center ? new Color(center).convertLinearToSRGB() : new Color('#ffffff').convertLinearToSRGB(), [center])

  return (
    <mesh key="plane" ref={ref} scale={scale} position={position} name={name}>
      <planeGeometry args={[width, height, segments, segments]} />
      {/* @ts-ignore */}
      <boxGradient
        inset={inset}
        innerColor={innerColor}
        outerColor={outerColor}
        centerColor={centerColor}
        aspect={aspectRatio}
        size={new Vector2(width, height)}
        curveIntensity={curveIntensity}
        curveProgress={curveProgress}
        opacity={opacity}
        transparent={true}
      />
    </mesh>
  )
}