import { type FC, useMemo, RefCallback, memo } from 'react'
import { Color, Object3D, FloatType, Vector2, Vector3 } from 'three'
import { BoxGradient } from "@/shaders/box-gradient";

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

export const CurvedPlane: FC<CurvedPlaneProps> = memo(({ 
  ref,
  name,
  aspectRatio = 1,
  segments = 128,
  width = 1,
  height = 1,
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
  const centerColor = useMemo(() => center ? new Color(center) : new Color('#ffffff'), [center])

  return (
    <mesh key="plane" ref={ref} scale={scale} position={position} name={name}>
      <planeGeometry args={[1, 1, segments, segments]} />
      {/* @ts-ignore */}
      <primitive
        object={new BoxGradient()}
        attach="material"
        uniforms={{
          inset: { value: inset },
          innerColor: { value: innerColor },
          outerColor: { value: outerColor },
          centerColor: { value: centerColor },
          aspect: { value: aspectRatio },
          size: { value: new Vector2(width, height) },
          curveIntensity: { value: curveIntensity },
          curveProgress: { value: curveProgress },
          opacity: { value: opacity },
        }}
        transparent={true}
      />
    </mesh>
  )
})