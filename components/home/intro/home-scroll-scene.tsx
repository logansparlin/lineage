'use client';

import { memo, useMemo, useRef } from "react";
import { getRandomGradient } from "@/lib/gradients";

import { Canvas, useThree, extend } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { HomeIntroInteraction } from "./home-intro-interaction";
import { Vector3 } from "three";

extend({ BoxGradient });

export const HomeScrollScene = memo(({ caseStudyGradient }: { caseStudyGradient: any }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen"
    >
      <Canvas
        gl={{
          antialias: true,
        }}
        camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 10000 }} 
        dpr={[1, 3]}
        shadows={true}
        className="w-full bg-black"
      >
        <Scene caseStudyGradient={caseStudyGradient} />
      </Canvas>
    </div>
  )
})

const Scene = ({ caseStudyGradient }: { caseStudyGradient: any }) => {
  const { viewport, scene } = useThree();
  const meshRef = useRef<any>(null);
  
  const gradient = getRandomGradient();

  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const normalizedSize = useMemo(() => {
    return Math.max(viewport.width, viewport.height);
  }, [viewport])

  const introPlanesTop = Array.from({ length: 8 }, (_, i) => i + 1);
  const introPlanesBottom = Array.from({ length: 5 }, (_, i) => i + 1);

  const exitPlanes = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <HomeIntroInteraction scene={scene} viewport={viewport} aspectRatio={aspectRatio} />
      <mesh ref={meshRef} name="intro-mesh">
        {introPlanesTop.map((step, index) => {
          return (
            <CurvedPlane
              key={`step-${step}`}
              name={`top-step-${step}`}
              width={viewport.width}
              height={viewport.height}
              aspectRatio={aspectRatio}
              curveIntensity={3}
              inner={gradient.inner}
              outer={gradient.outer}
              scale={new Vector3(0, 0, 0)}
              position={new Vector3(0, 0, index * 0.001)}
            />
          )
        })}

        {introPlanesBottom.map((step, index) => {
          const topFull = ((((normalizedSize * 1.5) - viewport.height) / 2) + viewport.height)
          const yPosition = -1 * (topFull + (index * (normalizedSize * 0.125)))

          return (
            <CurvedPlane
              name={`bottom-step-${step}`}
              key={`bottom-step-${step}`}
              width={viewport.width}
              height={viewport.height}
              aspectRatio={aspectRatio}
              curveIntensity={3}
              inner={gradient.outer}
              outer={gradient.inner}
              center={index === (introPlanesBottom.length - 1) ? "#000000" : "#FFFFFF"}
              scale={new Vector3(2.5, 1.5, 1)}
              position={new Vector3(0, yPosition, ((introPlanesTop.length - 1) + index) * 0.001)}
              inset={0.925}
            />
          )
        })}

        {exitPlanes.map((step, index) => {
          const yScale = 1.25;
          const topFull = ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height)
          const yPosition = (topFull + (index * (normalizedSize * 0.125))) - (normalizedSize * 1.5)
          // const zPosition = ((introPlanesTop.length - 1) + (introPlanesBottom.length - 1) + index) * 0.001
          const zPosition = -0.001 + (-1 * ((exitPlanes.length - index) * 0.001))

          return (
            <CurvedPlane
              key={`exit-plane-${step}`}
              name={`exit-plane-${step}`}
              width={viewport.width}
              height={viewport.height}
              aspectRatio={aspectRatio}
              curveIntensity={3}
              curveProgress={-1 * (index * 1)}
              inner={caseStudyGradient?.outer}
              outer={caseStudyGradient?.inner}
              center={index === (exitPlanes.length - 1) ? "#000000" : "#FFFFFF"}
              scale={new Vector3(3, yScale, 1)}
              position={new Vector3(0, yPosition, zPosition)}
            />
          )
        })}
      </mesh>
    </>
  )
}
