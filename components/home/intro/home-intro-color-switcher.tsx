'use client'

import { useMemo } from "react";
import { useHomeStore } from "../hooks/use-home-store";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getGradient } from "@/lib/gradients";
import { Color } from "three";

export const HomeIntroColorSwitcher = () => {
  const { scene } = useThree();
  const setIsColorChanging = useHomeStore((state) => state.setIsColorChanging);
  const nextGradient = useHomeStore((state) => state.nextGradient);

  const nextGradientData = useMemo(() => getGradient(nextGradient), [nextGradient]);

  useGSAP(() => {
    const introMesh = scene?.children?.find((child) => child.name === "intro-mesh");

    if (!nextGradientData || !introMesh) return;

    setIsColorChanging(true);

    introMesh.children?.forEach((child: any) => {
      if (child.name.includes('exit-plane')) return;

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

  return null;
}