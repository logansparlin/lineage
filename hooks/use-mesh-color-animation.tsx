import { type Gradient, getGradient } from "@/lib/gradients";
import { useSiteStore } from "@/stores/use-site-store";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { gsap } from "gsap";
import { Color } from "three";

interface UseMeshColorAnimationProps {
  meshRef: React.RefObject<any>;
  gradient: string;
}

export const useMeshColorAnimation = ({ meshRef, gradient }: UseMeshColorAnimationProps) => {
  const [internalGradient, setInternalGradient] = useState<Gradient>(getGradient(gradient))
  const setIsAnimatingGradient = useSiteStore((state) => state.setIsAnimatingGradient);

  useGSAP(() => {
    if (!meshRef.current) return;

    const planes = meshRef.current.children;

    const nextGradient = getGradient(gradient);

    // setIsAnimatingGradient(true);

    const onAnimationComplete = () => {
      // setIsAnimatingGradient(false);
    }

    planes?.forEach((plane, index) => {
      const uniforms = plane.material.uniforms;
      
      gsap.to(uniforms.innerColor.value, {
        r: new Color(nextGradient.inner).convertLinearToSRGB().r,
        g: new Color(nextGradient.inner).convertLinearToSRGB().g,
        b: new Color(nextGradient.inner).convertLinearToSRGB().b,
        duration: 0.75,
        overwrite: true,
        ease: 'power2.inOut',
      })

      gsap.to(uniforms.outerColor.value, {
        r: new Color(nextGradient.outer).convertLinearToSRGB().r,
        g: new Color(nextGradient.outer).convertLinearToSRGB().g,
        b: new Color(nextGradient.outer).convertLinearToSRGB().b,
        duration: 0.75,
        overwrite: true,
        ease: 'power2.inOut',
        onComplete: () => {
          if (index !== planes?.length - 1) return;

          onAnimationComplete();
        },
      })
    })
  }, [internalGradient, gradient])
}