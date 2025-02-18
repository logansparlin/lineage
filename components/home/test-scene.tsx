'use client';

import { useMemo, useRef } from "react";

import { Canvas, useThree, extend, useFrame } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/curved-plane";
import * as THREE from "three";

extend({ BoxGradient });

export const TestScene = () => {
  return (
    <div className="sticky top-0 w-full h-screen">
      <Canvas 
        gl={{ 
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping
        }}
        camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 10000 }} 
        dpr={[1, 3]}
        shadows={true}
        className="w-full h-full bg-[#fff]"
      >
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

  const mousePosition = useRef({
    current: 0,
    target: 0,
  })

  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const steps = Array.from({ length: 5 }, (_, i) => i + 1);

  useFrame(() => {
    if (!meshRef.current) return;

    mousePosition.current.current = lerp(mousePosition.current.current, mousePosition.current.target, 0.08);

    meshRef.current.children.forEach((child) => {
      child.material.uniforms.curveProgress.value = mousePosition.current.current;
      child.material.needsUpdate = true;
    })
  })

  return (
    <mesh 
      ref={meshRef}
      onPointerMove={(e) => {
        const mousePos = e.clientY / window.innerHeight;
        mousePosition.current.target = (mousePos * 2 - 1) * -1;
        console.log(mousePosition.current.target)
      }}
    >
      {steps.reverse().map((step) => {
        const percent = (step + 5) / 10;
        return (
          <CurvedPlane
            key={step}
            width={viewport.width * percent}
            height={viewport.height * percent}
            aspectRatio={aspectRatio}
            scale={percent}
            curveIntensity={4}
          />
        )
      })}
    </mesh>
  )
}