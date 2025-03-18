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

  const isSameGradient = (one: Gradient, two: Gradient) => {
    return one.label === two.label;
  }

  useGSAP(() => {
    if (!meshRef.current || isSameGradient(internalGradient, getGradient(gradient))) return;

    const planes = meshRef.current.children;

    let innerColor = { value: internalGradient.inner };
    let outerColor = { value: internalGradient.outer };

    const nextGradient = getGradient(gradient);
    
    const updateColors = () => {
      const nextInnerColor = new Color(innerColor.value).convertLinearToSRGB();
      const nextOuterColor = new Color(outerColor.value).convertLinearToSRGB();

      planes?.forEach(plane => {
        const uniforms = plane.material.uniforms;
        console.log(uniforms.centerColor.value)
        uniforms.innerColor.value = nextInnerColor;
        uniforms.outerColor.value = nextOuterColor;
      })  
    }

    updateColors();
    setIsAnimatingGradient(true);

    const onAnimationComplete = () => {
      setIsAnimatingGradient(false);
      setInternalGradient(nextGradient);
    }

    requestAnimationFrame(() => {
      gsap.to(innerColor, {
        value: nextGradient.inner,
        duration: 0.75,
        ease: 'power2.inOut',
      })
  
      gsap.to(outerColor, {
        value: nextGradient.outer,
        duration: 0.75,
        ease: 'power2.inOut',
        onUpdate: updateColors,
        onComplete: onAnimationComplete,
      })
    })
  }, [internalGradient, gradient])
}