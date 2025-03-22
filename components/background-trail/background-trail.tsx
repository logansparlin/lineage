'use client'

import { type FC, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useTrailTexture } from '@react-three/drei'
import { useIsomorphicLayoutEffect } from 'react-use'

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

  const [texture, onMove] = useTrailTexture({ 
    size: 1024,
    radius: 0.1,
    intensity: 0.1,
    interpolate: 5,
    smoothing: 0.1,
    maxAge: 660,
    minForce: 0.75,
    blend: 'screen',
  })

  useFrame((props) => {
    if (!meshRef.current) return

    const { viewport, clock } = props;
    const size = viewport.getCurrentViewport();

    meshRef.current.scale.set(size.width, size.height, 1)
    meshRef.current.material.uniforms.time.value = clock.getElapsedTime() * 0.1;
  })

  // const events = useThree((state) => state.events)

  useIsomorphicLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -((clientY / window.innerHeight) * 2 - 1);
      
      // Convert normalized coordinates back to screen coordinates for the trail
      const screenX = (normalizedX + 1) * window.innerWidth / 2;
      const screenY = (-normalizedY + 1) * window.innerHeight / 2;
      
      // Use screen coordinates for the trail function
      console.log(normalizedX, normalizedY)
      onMove({
        uv: {
          x: normalizedX * 0.5 + 0.5,
          y: normalizedY * 0.5 + 0.5,
        }
      })
      // onMove(screenX, screenY);
      // onMove(event.clientX, event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
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
