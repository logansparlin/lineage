'use client';

import { memo, useMemo, useRef } from "react";
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { getGradient, getRandomGradient } from "@/lib/gradients";

import { Canvas, useThree, extend } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { Vector3, Color } from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HomeIntroInteraction } from "./home-intro-interaction";
extend({ BoxGradient });

export const HomeScrollScene = memo(() => {
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
        {/* <Stats /> */}
        <Scene />
      </Canvas>
    </div>
  )
})

const Scene = () => {
  const { viewport, scene } = useThree();
  const meshRef = useRef<any>(null);
  
  const setIsColorChanging = useHomeStore((state) => state.setIsColorChanging);
  
  const gradient = getRandomGradient();


  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const steps = Array.from({ length: 8 }, (_, i) => i + 1);
  const bottomSteps = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <HomeIntroInteraction scene={scene} viewport={viewport} aspectRatio={aspectRatio} />
      <mesh ref={meshRef} name="intro-mesh">
        {steps.map((step, index) => {
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
              position={new Vector3(0, 0, index * 0.01)}
            />
          )
        })}

        {bottomSteps.map((step, index) => {
          const bottomPosition = -1 * viewport.height;
          const aspectOffset = (viewport.height * aspectRatio) - viewport.height;
          const offsetPosition = bottomPosition - index - (aspectOffset / 2);

          return (
            <CurvedPlane
              name={`bottom-step-${step}`}
              key={`bottom-step-${step}`}
              width={viewport.width}
              height={viewport.height}
              aspectRatio={aspectRatio}
              curveIntensity={2}
              inner={gradient.outer}
              outer={gradient.inner}
              center={index === (bottomSteps.length - 1) ? "#000000" : "#FFFFFF"}
              scale={new Vector3(1, 1, 1)}
              position={new Vector3(0, offsetPosition, (steps.length - 1) + 0.01 + (index * 0.01))}
              inset={0.98}
            />
          )
        })}
      </mesh>
    </>
  )
}