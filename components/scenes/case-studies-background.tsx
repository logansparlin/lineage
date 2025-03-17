import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useHomeStore } from "../home/hooks/use-home-store";
import { getStepColorsRGB } from "@/lib/get-step-colors";

import { Color } from "three";

export const CaseStudiesBackground = ({ gradientOverride }: { gradientOverride?: string }) => {
  const currentStep = useHomeStore(state => state.currentStep)
  const blurRef = useRef<any>(null)
  const { viewport } = useThree();

  const colors = useMemo(() => {
    if (gradientOverride) {
      const overrideColors = getStepColorsRGB(gradientOverride)
      return {
        background: new Color(overrideColors[400]).convertLinearToSRGB(),
        foreground: new Color(overrideColors[300]).convertLinearToSRGB(),
      }
    }

    const colors = getStepColorsRGB(currentStep)
    return {
      background: new Color(colors[400]).convertLinearToSRGB(),
      foreground: new Color(colors[300]).convertLinearToSRGB(),
    }
  }, [currentStep, gradientOverride])

  const initialColors = useRef({
    background: colors.background,
    foreground: colors.foreground,
  })

  useFrame(() => {
    if (!blurRef.current) return;

    const uniforms = blurRef.current.material.uniforms as any;

    uniforms.resolution.value.set(viewport.width, viewport.height)
    uniforms.bgColor.value.lerp(colors.background, 0.025)
    uniforms.fgColor.value.lerp(colors.foreground, 0.025)
  })

  return (
    <group>
      
      <mesh ref={blurRef} position={[0, 0, -5]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2, 1, 1]} />
        {/* @ts-ignore */}
        <blurShader
          bgColor={initialColors.current.background}
          fgColor={initialColors.current.foreground}
          resolution={[viewport.width, viewport.height]}
          radius={0.2}
          strength={1.5}
          transparent
        />
      </mesh>
    </group>
  )
}