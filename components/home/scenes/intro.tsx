'use client';

import { useMemo, useRef } from "react";
import { useLenis } from "lenis/react";
import { useHomeStore } from "../hooks/use-home-store";
import { useFrame, useThree } from "@react-three/fiber";
import { lerp } from "@/lib/lerp";
import { gsap } from "gsap";

import { Vector3 } from "three";
import { CurvedPlane } from "../intro/curved-plane";
import { getGradient } from "@/lib/gradients";
import { useMeshColorAnimation } from "@/hooks/use-mesh-color-animation";

export const IntroScene = ({ container, sections }: { container: React.RefObject<HTMLDivElement>, sections: string[] }) => {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  const lenis = useLenis();
  
  const gradient = useHomeStore(state => state.gradient);
  const currentGradient = useMemo(() => getGradient(gradient), [])

  useMeshColorAnimation({ meshRef, gradient })

  const progressRef = useRef<any>({
    first: 0,
    second: 0,
    last: 0,
  })

  const planes = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

  useFrame(() => {
    if (typeof window === 'undefined') return;

    const currentScroll = lenis?.scroll ?? window.scrollY;
    
    const firstSection = sections.find(section => section.includes('first'))
    const firstSectionEl = document.querySelector(firstSection)
    const firstSectionHeight = firstSectionEl?.scrollHeight;

    const secondSection = sections.find(section => section.includes('second'))
    const secondSectionEl = document.querySelector(secondSection)
    const secondSectionHeight = secondSectionEl?.scrollHeight;

    const firstAnimationStart = 0;
    const firstAnimationEnd = firstAnimationStart + (firstSectionHeight * 0.6);
    const firstAnimationDuration = firstAnimationEnd - firstAnimationStart;

    const secondAnimationStart = firstAnimationEnd;
    const secondAnimationEnd = secondAnimationStart + (firstSectionHeight * 0.4);
    const secondAnimationDuration = secondAnimationEnd - secondAnimationStart;

    const lastAnimationStart = secondAnimationEnd;
    const lastAnimationEnd = lastAnimationStart + secondSectionHeight;
    const lastAnimationDuration = lastAnimationEnd - lastAnimationStart;

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

    const firstAnimationProgress = progressRef.current.first;
    const secondAnimationProgress = progressRef.current.second;
    const lastAnimationProgress = progressRef.current.last;

    
    const meshChildren = meshRef.current?.children;

    meshChildren?.forEach((child, index) => {
      const reverseIndex = planes.length - 1 - index;
      const stepOneScale = 0.3;
      const stepTwoScale = reverseIndex * (0.7 / (planes.length - 1))
      const stepThreeScale = (0.7 + (reverseIndex * 0.15))
      const scale = (firstAnimationProgress * stepOneScale) + (secondAnimationProgress * stepTwoScale) + (lastAnimationProgress * stepThreeScale);

      child.scale.x = scale;
      child.scale.y = scale;
    })
  })

  return (
    <mesh ref={meshRef}>
      {planes.map((plane, index) => {
        return (
          <CurvedPlane
            key={`plane-${plane}`}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={viewport.width / viewport.height}
            curveIntensity={3}
            inner={currentGradient.inner}
            outer={currentGradient.outer}
            scale={new Vector3(0, 0, 0)}
            position={new Vector3(0, 0, index * 0.001)}
            opacity={1}
          />
        )
      })}
    </mesh>
  )
}