'use client';

import { useMemo, useRef, useState } from "react";
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { lerp } from "@/lib/lerp";
import { gsap } from "gsap";

import { Vector3, Color } from "three";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { getGradient } from "@/lib/gradients";

export const IntroScene = ({ sections }: { sections: string[] }) => {
  const meshRef = useRef<any>(null);
  const lenis = useLenis();
  
  const gradient = useHomeStore(state => state.gradient);
  const [currentGradient, setCurrentGradient] = useState(getGradient(gradient));

  // useMeshColorAnimation({ meshRef, gradient })

  const progressRef = useRef<any>({
    first: 0,
    second: 0,
    last: 0,
    description: 0,
  })

  const planes = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

  const scale = new Vector3(0, 0, 0);

  useFrame(({ viewport }) => {
    if (typeof window === 'undefined') return;

    const size = viewport.getCurrentViewport();

    const aspectRatio = size.width / size.height;

    const currentScroll = lenis?.scroll ?? window.scrollY;

    const description: HTMLElement = document.querySelector('.home-intro-description')
    const descriptionHeight = description?.scrollHeight;
    
    const firstSection = sections.find(section => section.includes('first'))
    const firstSectionEl = document.querySelector(firstSection)
    const firstSectionHeight = firstSectionEl?.scrollHeight;

    const secondSection = sections.find(section => section.includes('second'))
    const secondSectionEl = document.querySelector(secondSection)
    const secondSectionHeight = secondSectionEl?.scrollHeight;

    const lastSection = sections.find(section => section.includes('last'))
    const lastSectionEl: HTMLElement = document.querySelector(lastSection)
    const lastSectionHeight = lastSectionEl?.scrollHeight;

    const firstAnimationStart = 0;
    const firstAnimationEnd = firstAnimationStart + (firstSectionHeight * 0.6);
    const firstAnimationDuration = firstAnimationEnd - firstAnimationStart;

    const secondAnimationStart = firstAnimationEnd;
    const secondAnimationEnd = secondAnimationStart + (firstSectionHeight * 0.4);
    const secondAnimationDuration = secondAnimationEnd - secondAnimationStart;

    const lastAnimationStart = secondAnimationEnd;
    const lastAnimationEnd = lastAnimationStart + secondSectionHeight;
    const lastAnimationDuration = lastAnimationEnd - lastAnimationStart;

    const descriptionAnimationStart = lastSectionEl?.offsetTop - (window.innerHeight / 3);
    const descriptionAnimationEnd = descriptionAnimationStart + lastSectionHeight - (window.innerHeight * 0.7);
    const descriptionAnimationDuration = descriptionAnimationEnd - descriptionAnimationStart;

    progressRef.current.first = lerp({
      start: progressRef.current.first,
      end: gsap.utils.clamp(0, 1, currentScroll / firstAnimationDuration),
      time: 1
    })

    progressRef.current.second = lerp({
      start: progressRef.current.second,
      end: gsap.utils.clamp(0, 1, (currentScroll - secondAnimationStart) / secondAnimationDuration),
      time: 1
    })

    progressRef.current.last = lerp({
      start: progressRef.current.last,
      end: gsap.utils.clamp(0, 1, (currentScroll - lastAnimationStart) / lastAnimationDuration),
      time: 1
    })

    progressRef.current.description = lerp({
      start: progressRef.current.description,
      end: gsap.utils.clamp(0, 1, (currentScroll - descriptionAnimationStart) / descriptionAnimationDuration),
      time: 1
    })

    const firstAnimationProgress = progressRef.current.first;
    const secondAnimationProgress = progressRef.current.second;
    const lastAnimationProgress = progressRef.current.last;
    const descriptionProgress = progressRef.current.description;
    
    if (description) {
      description.style.height = `${descriptionHeight * descriptionProgress}px`;
    }
    
    const meshChildren = meshRef.current?.children;

    meshChildren?.forEach((child, index) => {
      const reverseIndex = planes.length - 1 - index;
      const aspectOffset = aspectRatio > 1 ? 1 : aspectRatio;
      
      const stepOneScale = 0.3;
      const stepTwoScale = reverseIndex * (0.7 / (planes.length - 1))
      const stepThreeScale = (0.7 + (reverseIndex * 0.15))

      const scaleX = (
        (firstAnimationProgress * stepOneScale) 
        + (secondAnimationProgress * stepTwoScale)
        + (lastAnimationProgress * ((stepThreeScale - (0.525 * (1 - aspectOffset))) * aspectOffset))
      );

      const scaleY = (
        (firstAnimationProgress * stepOneScale) 
        + (secondAnimationProgress * stepTwoScale)
        + (lastAnimationProgress * stepThreeScale)
      );

      const normalizedSize = Math.max(size.width, size.height);

      child.scale.x = scaleX * normalizedSize;
      child.scale.y = scaleY * normalizedSize;
    })
  })

  useGSAP(() => {
    if (!meshRef.current) return;
    
    const planes = meshRef.current.children;
    const newGradient = getGradient(gradient);
    
    const innerColor = { value: currentGradient.inner };
    const outerColor = { value: currentGradient.outer };

    const updateColors = () => {
      planes?.forEach(plane => {
        const uniforms = plane.material.uniforms;
        uniforms.outerColor.value = new Color(innerColor.value).convertLinearToSRGB();
        uniforms.innerColor.value = new Color(outerColor.value).convertLinearToSRGB();
      })
    }

    const onAnimationComplete = () => {
      setCurrentGradient(newGradient);
    }

    requestAnimationFrame(() => {
      gsap.to(innerColor, {
        value: newGradient.inner,
        duration: 0.5,
        ease: 'power2.inOut',
      })
  
      gsap.to(outerColor, {
        value: newGradient.outer,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: updateColors,
        onComplete: onAnimationComplete,
      })
    })
  }, [gradient])

  return (
    <mesh ref={meshRef}>
      {planes.map((plane, index) => {
        return (
          <CurvedPlane
            key={`intro-plane-${plane}`}
            curveIntensity={3}
            inner={currentGradient.inner}
            outer={currentGradient.outer}
            center={'#ffffff'}
            opacity={1}
          />
        )
      })}
    </mesh>
  )
}