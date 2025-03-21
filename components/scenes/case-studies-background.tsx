import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useHomeStore } from "../home/hooks/use-home-store";
import { getStepColorsRGB } from "@/lib/get-step-colors";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { Color, Vector2 } from "three";
import { BlurShader } from "@/shaders/blur-shader";

export const CaseStudiesBackground = ({ gradientOverride }: { gradientOverride?: string }) => {
  const currentStep = useHomeStore(state => state.currentStep)
  const blurRef = useRef<any>(null)
  
  const [internalGradient, setInternalGradient] = useState<any>(
    getStepColorsRGB(gradientOverride ?? currentStep)
  )

  const initialColors = useMemo(() => {
    return {
      background: new Color(internalGradient?.[400]).convertLinearToSRGB(),
      foreground: new Color(internalGradient?.[300]).convertLinearToSRGB(),
    }
  }, [internalGradient])

  useGSAP(() => {
    if (gradientOverride || !blurRef.current) return;

    const nextGradient = getStepColorsRGB(currentStep)

    const uniforms = blurRef.current.material.uniforms as any;

    gsap.to(uniforms.bgColor.value, {
      r: new Color(nextGradient[400]).convertLinearToSRGB().r,
      g: new Color(nextGradient[400]).convertLinearToSRGB().g,
      b: new Color(nextGradient[400]).convertLinearToSRGB().b,
      duration: 0.75,
      overwrite: true,
      ease: 'linear',
    })

    gsap.to(uniforms.fgColor.value, {
      r: new Color(nextGradient[300]).convertLinearToSRGB().r,
      g: new Color(nextGradient[300]).convertLinearToSRGB().g,
      b: new Color(nextGradient[300]).convertLinearToSRGB().b,
      duration: 0.75,
      overwrite: true,
      ease: 'linear',
    })
  }, [currentStep])

  useFrame(({ viewport }) => {
    if (!blurRef.current) return;
    
    const size = viewport.getCurrentViewport();
    const uniforms = blurRef.current.material.uniforms as any;

    blurRef.current.scale.set(size.width * 2, size.height * 2)
    uniforms.resolution.value.set(size.width, size.height)
  })

  const resolution = new Vector2(1, 1);

  return (
    <group>
      <mesh ref={blurRef} position={[0, 0, -5]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        {/* @ts-ignore */}
        <primitive
          attach="material"
          object={new BlurShader()}
          uniforms={{
            bgColor: { value: initialColors.background },
            fgColor: { value: initialColors.foreground },
            radius: { value: 0.2 },
            strength: { value: 1.5 },
            resolution: { value: resolution }
          }}
          transparent
        />
      </mesh>
    </group>
  )
}