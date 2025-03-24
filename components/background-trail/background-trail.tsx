'use client'

import { type FC, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useTrailTexture } from '@react-three/drei'
import { useIsomorphicLayoutEffect } from 'react-use'
import { useIsSafari } from '@/hooks/use-is-safari'

import { Color, Vector2 } from 'three'
import { TrailShader } from '@/shaders/trail-shader'

extend({ TrailShader })

interface BackgroundTrailProps {
  colors: string[]
}

export const BackgroundTrail: FC<BackgroundTrailProps> = ({
  colors = ['#FBC504', '#FF7EC5', '#01C2FF', '#00BF57']
}) => {
  const meshRef = useRef<any>(null)
  const isSafari = useIsSafari()

  const [texture, onMove] = useTrailTexture({ 
    size: 256,
    radius: isSafari ? 0.1 : 0.175,
    intensity: isSafari ? 0.35 : 0.55,
    interpolate: isSafari ? 2 : 4,
    smoothing: isSafari ? 0.25 : 0.85,
    maxAge: 450,
    minForce: 1.0,
    blend: 'lighten',
  })

  useFrame((props) => {
    if (!meshRef.current) return

    const { viewport, clock } = props;
    const size = viewport.getCurrentViewport();

    meshRef.current.scale.set(size.width, size.height, 1)
    meshRef.current.material.uniforms.time.value = clock.getElapsedTime() * 0.1;
    meshRef.current.material.uniforms.resolution.value = new Vector2(size.width, size.height);
  })

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -((clientY / window.innerHeight) * 2 - 1);
      
      onMove({
        uv: {
          x: normalizedX * 0.5 + 0.5,
          y: normalizedY * 0.5 + 0.5,
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (typeof window === 'undefined') return;

      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [onMove])

  const resolution = new Vector2(0, 0);

  const trailColorOne = new Color(new Color(colors?.[0] ?? '#000000').convertLinearToSRGB())
  const trailColorTwo = new Color(new Color(colors?.[1] ?? '#000000').convertLinearToSRGB())
  const trailColorThree = new Color(new Color(colors?.[2] ?? '#000000').convertLinearToSRGB())
  const trailColorFour = new Color(new Color(colors?.[3] ?? '#000000').convertLinearToSRGB())

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1, 256, 256]} />
      <primitive
        key={TrailShader.key}
        object={new TrailShader()}
        attach="material"
        transparent
        uniforms={{
          colorOne: { value: trailColorOne },
          colorTwo: { value: trailColorTwo },
          colorThree: { value: trailColorThree },
          colorFour: { value: trailColorFour },
          map: { value: texture },
          resolution: { value: resolution },
          time: { value: 0 },
        }}
      />
    </mesh>
  )
}
