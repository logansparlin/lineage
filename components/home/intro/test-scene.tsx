'use client';

import { useMemo, useRef } from "react";
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { getGradient } from "@/lib/gradients";

import { Canvas, useThree, extend } from "@react-three/fiber"
import { BoxGradient } from "@/shaders/box-gradient";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { Vector3, Color } from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
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

const Scene = () => {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  
  const addPlaneRef = useHomeStore((state) => state.addPlaneRef);
  const addBottomPlaneRef = useHomeStore((state) => state.addBottomPlaneRef);
  const setIsColorChanging = useHomeStore((state) => state.setIsColorChanging);
  
  const gradient = useHomeStore((state) => state.gradient);

  const gradientData = useMemo(() => getGradient(gradient), [gradient]);

  const nextGradient = useHomeStore((state) => state.nextGradient);

  const nextGradientData = useMemo(() => getGradient(nextGradient), [nextGradient]);

  useGSAP(() => {
    if (!nextGradientData) return;

    setIsColorChanging(true);

    meshRef.current?.children?.forEach((child) => {
      if (child.name.includes('bottom')) {
        child.material.uniforms.innerColorNext.value = new Color(nextGradientData.outer).convertLinearToSRGB();
        child.material.uniforms.outerColorNext.value = new Color(nextGradientData.inner).convertLinearToSRGB();
      } else {
        child.material.uniforms.innerColorNext.value = new Color(nextGradientData.outer).convertLinearToSRGB();
        child.material.uniforms.outerColorNext.value = new Color(nextGradientData.inner).convertLinearToSRGB();
      }

      gsap.to(child.material.uniforms.colorProgress, {
        value: 1,
        duration: 0.75,
        ease: 'power4.out',
        onComplete: () => {
          setIsColorChanging(false);
          gsap.set(child.material.uniforms.colorProgress, { value: 0 })
          if (child.name.includes('bottom')) {
            gsap.set(child.material.uniforms.outerColor, { value: new Color(nextGradientData.inner).convertLinearToSRGB() })
            gsap.set(child.material.uniforms.innerColor, { value: new Color(nextGradientData.outer).convertLinearToSRGB() })
          } else {
            gsap.set(child.material.uniforms.outerColor, { value: new Color(nextGradientData.inner).convertLinearToSRGB() })
            gsap.set(child.material.uniforms.innerColor, { value: new Color(nextGradientData.outer).convertLinearToSRGB() })
          }
        }
      })
    })
  }, {
    dependencies: [nextGradientData]
  })


  const aspectRatio = useMemo(() => {
    const aspect = viewport.height / viewport.width;
    return 1 / aspect;
  }, [viewport]);

  const steps = Array.from({ length: 8 }, (_, i) => i + 1);
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
            inner={gradientData.inner}
            outer={gradientData.outer}
            scale={new Vector3(0, 0, 0)}
            position={new Vector3(0, 0, index * 0.01)}
          />
        )
      })}

      {bottomSteps.map((step, index) => {
        const bottomPosition = -1 * viewport.height;
        const aspectOffset = (viewport.height * aspectRatio) - viewport.height;
        const offsetPosition = bottomPosition - (index * 1) - (aspectOffset / 2);

        return (
          <CurvedPlane
            name={`bottom-step-${step}`}
            key={`bottom-step-${step}`}
            ref={(el) => addBottomPlaneRef(el, index)}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={aspectRatio}
            curveIntensity={2.5}
            inner={gradientData.outer}
            outer={gradientData.inner}
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