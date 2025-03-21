import { getGradient } from "@/lib/gradients";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Color } from "three";

interface UseMeshColorAnimationProps {
  meshRef: React.RefObject<any>;
  gradient: string;
  invert?: boolean;
}

export const useMeshColorAnimation = ({ meshRef, gradient, invert = false }: UseMeshColorAnimationProps) => {
  useGSAP(() => {
    if (!meshRef.current) return;

    const planes = meshRef.current.children;

    const nextGradient = getGradient(gradient);

    const nextInnerColor = invert ? nextGradient.outer : nextGradient.inner;
    const nextOuterColor = invert ? nextGradient.inner : nextGradient.outer;

    planes?.forEach((plane, index) => {
      const uniforms = plane.material.uniforms;
      
      gsap.to(uniforms.innerColor.value, {
        r: new Color(nextInnerColor).convertLinearToSRGB().r,
        g: new Color(nextInnerColor).convertLinearToSRGB().g,
        b: new Color(nextInnerColor).convertLinearToSRGB().b,
        duration: 0.75,
        overwrite: true,
        ease: 'power2.inOut',
      })

      gsap.to(uniforms.outerColor.value, {
        r: new Color(nextOuterColor).convertLinearToSRGB().r,
        g: new Color(nextOuterColor).convertLinearToSRGB().g,
        b: new Color(nextOuterColor).convertLinearToSRGB().b,
        duration: 0.75,
        overwrite: true,
        ease: 'power2.inOut',
      })
    })
  }, [gradient])
}