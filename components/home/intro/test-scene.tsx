'use client';

import { useEffect, useMemo, useRef } from "react";
import { useHomeStore } from "@/components/home/hooks/use-home-store";

import { Canvas, useThree, extend, useFrame } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { Stats } from "@react-three/drei";
import { Color, Vector3 } from "three";

extend({ BoxGradient });

export const TestScene = () => {
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
}

const lerp = (a, b, t) => {
  return a + (b - a) * t;
}

const Scene = () => {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  
  const addPlaneRef = useHomeStore((state) => state.addPlaneRef);
  const addBottomPlaneRef = useHomeStore((state) => state.addBottomPlaneRef);

  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const steps = Array.from({ length: 6 }, (_, i) => i + 1);
  const bottomSteps = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <mesh ref={meshRef}>
      {steps.map((step, index) => {
        return (
          <CurvedPlane
            key={`step-${step}`}
            ref={(el) => addPlaneRef(el, index)}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={aspectRatio}
            curveIntensity={3}
            inner={"#F44318"}
            outer={"#FE9807"}
            scale={new Vector3(0, 0, 0)}
            position={new Vector3(0, 0, index * 0.01)}
          />
        )
      })}

      {bottomSteps.map((step, index) => {
        const bottomPosition = -1 * viewport.height;
        const aspectOffset = (viewport.height * aspectRatio) - viewport.height;
        const offsetPosition = bottomPosition - (index * 1.75) - (aspectOffset / 2);

        return (
          <CurvedPlane
            key={`bottom-step-${step}`}
            ref={(el) => addBottomPlaneRef(el, index)}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={aspectRatio}
            curveIntensity={2.5}
            inner={"#FE9807"}
            outer={"#F44318"}
            center={index === (bottomSteps.length - 1) ? "#000000" : "#FFFFFF"}
            scale={new Vector3(1, 1, 1)}
            position={new Vector3(0, offsetPosition, (steps.length - 1) + 0.01 + (index * 0.01))}
            inset={0.98}
          />
        )
      })}
    </mesh>
  )
}