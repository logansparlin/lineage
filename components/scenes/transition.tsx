import { type FC, RefObject, useCallback, useMemo, useRef } from "react";
import { useMeshColorAnimation } from "@/hooks/use-mesh-color-animation";
import { useFrame, useThree } from "@react-three/fiber"
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { getGradient } from "@/lib/gradients";
import { Vector3 } from "three";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";

import { View } from "@react-three/drei";
import { CurvedPlane } from "@/components/home/intro/curved-plane";

interface TransitionSceneProps {
  mode: 'enter' | 'exit';
  gradientOverride?: string;
  className?: string;
}

export const TransitionScene: FC<TransitionSceneProps> = ({ mode = 'enter', gradientOverride, className = '' }) => {
  const transitionRef = useRef<any>(null);

  return (
    <div className={`${className} w-full h-screen-200`} ref={transitionRef}>
      <View className="w-full h-full">
        <Planes container={transitionRef} mode={mode} gradientOverride={gradientOverride} />
      </View>
    </div>
  )
}

interface PlanesProps {
  container: RefObject<any>;
  mode: 'enter' | 'exit';
  gradientOverride?: string;
}

const Planes = ({ container, mode, gradientOverride }: PlanesProps) => {
  const meshRef = useRef<any>(null);
  const lenis = useLenis();
  
  const { viewport } = useThree();

  const gradient = useHomeStore(state => state.gradient);
  const currentGradient = useMemo(() => gradientOverride ? getGradient(gradientOverride) : getGradient(gradient), [gradientOverride])
  
  useMeshColorAnimation({ meshRef, gradient: gradientOverride ? currentGradient.label : gradient })
  
  const planes = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  const aspectRatio = useMemo(() => viewport.width / viewport.height, [viewport])

  const normalizedSize = useMemo(() => {
    return Math.max(viewport.width, viewport.height);
  }, [viewport])

  useFrame((props) => {
    const el = container.current;
    const allPlanes = meshRef.current?.children;

    if (!el || !allPlanes) return;

    const currentScroll = lenis?.scroll ?? window.scrollY;

    const progressRaw = ((currentScroll - el.offsetTop) + window.innerHeight) / (el.clientHeight)

    const progress = gsap.utils.clamp(0, 1, progressRaw);

    allPlanes.forEach((plane, index) => {
      const curveProgress = (index * 1) * progress * (mode === 'enter' ? -1 : 1);
      
      plane.material.uniforms.curveProgress.value = curveProgress;
    })
  })

  const yScale = useMemo(() => {
    return aspectRatio > 1 ? 1 : 1.5;
  }, [aspectRatio])

  const yStart = useMemo(() => {
    return ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height) - viewport.height;
  }, [normalizedSize, yScale, viewport])

  const calculatePosition = useCallback((index: number) => {
    const yOffset = (index * (normalizedSize * 0.06))
    const yPosition = (yStart + yOffset) * (mode === 'enter' ? 1 : -1)
    const zPosition = ((planes.length - 1) + index) * 0.001

    return new Vector3(0, yPosition, zPosition)
  }, [mode, yStart])

  const scale = useMemo(() => {
    return new Vector3(1.25, yScale, 1)
  }, [yScale])

  return (
    <mesh ref={meshRef}>
      {planes?.map((_, index) => {
        return (
          <CurvedPlane
            key={`plane-${index}`}
            width={viewport.width}
            height={viewport.height}
            aspectRatio={aspectRatio}
            curveIntensity={3}
            inner={currentGradient.outer}
            outer={currentGradient.inner}
            center={index === (planes.length - 1) ? "#000000" : "#FFFFFF"}
            scale={scale}
            position={calculatePosition(index)}
            inset={1}
            opacity={1}
          />
        )
      })}
    </mesh>
  )
}