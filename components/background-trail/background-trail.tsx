'use client'

import { type FC, Suspense, useMemo, useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useTrailTexture, AdaptiveDpr } from '@react-three/drei'

import { useIsomorphicLayoutEffect, useWindowSize } from 'react-use'
import { SRGBColorSpace, Color } from 'three'
import { TrailShader } from '@/shaders/trail-shader'

extend({ TrailShader })

interface BackgroundTrailProps {
  colors: string[]
}

export const BackgroundTrail: FC<BackgroundTrailProps> = ({
  colors = ['rgba(251, 197, 4, 1)', 'rgba(0, 191, 87, 1)', 'rgba(255, 126, 197, 1)']
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const isMobile = useMemo(() => {
    return width < 800
  }, [width])

  return (
    <Suspense fallback={null}>
      {!isMobile ? (
        <div 
          ref={containerRef}
          className="fixed inset-0 w-full h-full z-[1]"
        >
          <Canvas
            linear
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10], fov: 120, near: 0.01, far: 100 }} 
            gl={{ antialias: true, alpha: true, outputColorSpace: SRGBColorSpace }}
            resize={{
              scroll: false,
              debounce: 50,
            }}
            style={{
              position: 'fixed',
              width: '100%',
              height: '100vh',
              inset: 0,
              zIndex: 1
            }}
          >
            <AdaptiveDpr />
            <BackgroundTrailCanvas colors={colors} />
          </Canvas>
        </div>
      ) : null}
    </Suspense>
  )
}

const BackgroundTrailCanvas: FC<BackgroundTrailProps> = ({
  colors = ['rgba(251, 197, 4, 1)', 'rgba(0, 191, 87, 1)', 'rgba(255, 126, 197, 1)']
}) => {
  const meshRef = useRef<any>(null)

  const [texture, onMove] = useTrailTexture({ 
    size: 40,
    radius: 0.075,
    intensity: 0.05,
    maxAge: 400,
    minForce: 0.2,
    blend: 'screen',
  })

  useFrame((props) => {
    if (!meshRef.current) return

    const { viewport } = props;
    const size = viewport.getCurrentViewport();

    // onMove({ x: pointer.x, y: pointer.y })

    meshRef.current.scale.set(size.width, size.height, 1)
  })

  // const events = useThree((state) => state.events)

  // useIsomorphicLayoutEffect(() => {
  //   console.log(events, document.body)
  //   events.connect(document.body)
  //   const handleMouseMove = (event: MouseEvent) => {
  //     // console.log(event.clientX, event.clientY)
  //     // onMove(event.clientX, event.clientY)
  //   }

  //   // window.addEventListener('mousemove', handleMouseMove)

  //   return () => window.removeEventListener('mousemove', handleMouseMove)
  // }, [onMove])

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      onPointerMove={onMove}
    >
      <planeGeometry args={[1, 1]} />
      <primitive
        object={new TrailShader()}
        attach="material"
        transparent
        uniforms={{
          colorOne: { value: new Color('#000000') },
          colorTwo: { value: new Color('#ffffff') },
          map: { value: texture },
        }}
      />
    </mesh>
  )
}
