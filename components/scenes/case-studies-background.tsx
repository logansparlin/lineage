import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useHomeStore } from "../home/hooks/use-home-store";
import { getStepColorsRGB } from "@/lib/get-step-colors";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { Color } from "three";

export const CaseStudiesBackground = ({ gradientOverride }: { gradientOverride?: string }) => {
  const currentStep = useHomeStore(state => state.currentStep)
  const blurRef = useRef<any>(null)
  const [internalGradient, setInternalGradient] = useState<any>(
    getStepColorsRGB(gradientOverride ?? currentStep)
  )

  const { viewport } = useThree();

  const initialColors = useMemo(() => {
    return {
      background: new Color(internalGradient[400]).convertLinearToSRGB(),
      foreground: new Color(internalGradient[300]).convertLinearToSRGB(),
    }
  }, [internalGradient])

  useGSAP(() => {
    if (gradientOverride || !blurRef.current) return;

    const nextGradient = getStepColorsRGB(currentStep)

    const uniforms = blurRef.current.material.uniforms as any;

    let backgroundColor = { value: internalGradient[400] };
    let foregroundColor = { value: internalGradient[300] };

    const updateColors = () => {
      const nextBackgroundColor = new Color(backgroundColor.value).convertLinearToSRGB();
      const nextForegroundColor = new Color(foregroundColor.value).convertLinearToSRGB();

      uniforms.bgColor.value = nextBackgroundColor;
      uniforms.fgColor.value = nextForegroundColor;
    }

    const onAnimationComplete = () => {
      setInternalGradient(nextGradient);
    }

    requestAnimationFrame(() => {
      gsap.to(backgroundColor, {
        value: nextGradient[400],
        duration: 0.5,
        ease: 'power2.inOut',
      })
  
      gsap.to(foregroundColor, {
        value: nextGradient[300],
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: updateColors,
        onComplete: onAnimationComplete,
      })
    })
  }, [currentStep, gradientOverride])

  useFrame(() => {
    if (!blurRef.current) return;

    const uniforms = blurRef.current.material.uniforms as any;

    uniforms.resolution.value.set(viewport.width, viewport.height)
  })

  if (!viewport.width || !viewport.height) return null;

  return (
    <group>
      
      <mesh ref={blurRef} position={[0, 0, -5]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2, 1, 1]} />
        {/* @ts-ignore */}
        <blurShader
          bgColor={initialColors.background}
          fgColor={initialColors.foreground}
          resolution={[viewport.width, viewport.height]}
          radius={0.2}
          strength={1.5}
          transparent
        />
      </mesh>
    </group>
  )
}