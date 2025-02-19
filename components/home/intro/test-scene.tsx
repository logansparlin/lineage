'use client';

import { useMemo, useRef } from "react";
import { useHomeStore } from "@/components/home/hooks/use-home-store";

import { Canvas, useThree, extend, useFrame } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";

extend({ BoxGradient });

export const TestScene = () => {
  return (
    <div
      className="sticky top-0 w-full h-screen"
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

  const mousePosition = useRef({
    current: 0,
    target: 0,
  })

  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const steps = Array.from({ length: 6 }, (_, i) => i + 1);

  useFrame(() => {
    if (!meshRef.current) return;

    mousePosition.current.current = lerp(mousePosition.current.current, mousePosition.current.target, 0.08);

    meshRef.current.children.forEach((child) => {
      child.material.uniforms.curveProgress.value = mousePosition.current.current;
      child.material.needsUpdate = true;
    })
  })

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const mousePos = e.clientY / window.innerHeight;
  //     mousePosition.current.target = (mousePos * 2 - 1);
  //   }

  //   window.addEventListener('mousemove', handleMouseMove)

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //   }
  // }, [])

  return (
    <mesh ref={meshRef}>
      {steps.reverse().map((step, index) => {
        return (
          <CurvedPlane
            ref={(el) => addPlaneRef(el, index)}
            key={step}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={aspectRatio}
            scale={1}
            curveIntensity={4}
            inner={"#F44318"}
            outer={"#FE9807"}
          />
        )
      })}
    </mesh>
  )
}