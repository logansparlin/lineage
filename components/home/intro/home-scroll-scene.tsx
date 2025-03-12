'use client';

import { memo, useMemo, useRef } from "react";
import { getRandomGradient } from "@/lib/gradients";

import { Canvas, useThree, extend } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { HomeIntroInteraction } from "./home-intro-interaction";
import { HomeIntroColorSwitcher } from "./home-intro-color-switcher";
import { Vector3 } from "three";

extend({ BoxGradient });

export const HomeScrollScene = memo(({ caseStudyGradient }: { caseStudyGradient: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="home-scroll-scene"
      className="fixed top-0 left-0 w-full h-screen overflow-hidden"
      ref={containerRef}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        resize={{
          scroll: false,
          debounce: 0,
        }}
        camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 10000 }} 
        dpr={[1, 3]}
        shadows={true}
        className="w-full bg-transparent"
      >
        <Scene caseStudyGradient={caseStudyGradient} />
      </Canvas>
    </div>
  )
})

const Scene = ({ caseStudyGradient }: { caseStudyGradient: any }) => {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  
  const gradient = useMemo(() => getRandomGradient(), []);

  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const normalizedSize = useMemo(() => {
    return Math.max(viewport.width, viewport.height);
  }, [viewport])

  const introPlanesTop = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);
  const introPlanesBottom = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  const exitPlanes = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  console.log('re rendering scene')

  return (
    <>
      <HomeIntroInteraction />
      <HomeIntroColorSwitcher />
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
              opacity={1}
            />
          )
        })}

        {introPlanesBottom.map((step, index) => {
          const yScale = aspectRatio > 1 ? 1.5 : 2.5;
          const topFull = ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height)
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
              scale={new Vector3(2.5, yScale, 1)}
              position={new Vector3(0, yPosition, ((introPlanesTop.length - 1) + index) * 0.001)}
              inset={0.925}
              opacity={1}
            />
          )
        })}

        {exitPlanes.map((step, index) => {
          const yScale = 1.5;
          const topFull = ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height)
          const yPosition = (topFull + (index * (normalizedSize * 0.125))) - (normalizedSize * yScale)
          // const zPosition = ((introPlanesTop.length - 1) + (introPlanesBottom.length - 1) + index) * 0.001
          const zPosition = index * 0.001

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
              inset={0.985}
              opacity={0}
            />
          )
        })}
      </mesh>
    </>
  )
}
