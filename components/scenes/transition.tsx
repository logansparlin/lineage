import { type FC, RefObject, useMemo, useRef } from "react";
import { useMeshColorAnimation } from "@/hooks/use-mesh-color-animation";
import { useFrame } from "@react-three/fiber"
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { getGradient } from "@/lib/gradients";
import { Vector2, Vector3 } from "three";
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
      <View className="w-full h-full pointer-events-none">
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

  const gradient = useHomeStore(state => state.gradient);
  const currentGradient = useMemo(() => gradientOverride ? getGradient(gradientOverride) : getGradient(gradient), [gradientOverride])
  
  useMeshColorAnimation({ meshRef, gradient: gradientOverride ? currentGradient?.label : gradient })
  
  const planes = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  // const aspectRatio = useMemo(() => viewport.width / viewport.height, [viewport])

  // const normalizedSize = useMemo(() => {
  //   return Math.max(viewport.width, viewport.height);
  // }, [])

  // const yScale = useMemo(() => {
  //   return aspectRatio > 1 ? 1 : 1.5;
  // }, [])

  // const yStart = useMemo(() => {
  //   return ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height) - viewport.height;
  // }, [normalizedSize, yScale, viewport])

  // const calculatePosition = useCallback((index: number) => {
  //   const yOffset = (index * (normalizedSize * 0.06))
  //   const yPosition = (yStart + yOffset) * (mode === 'enter' ? 1 : -1)
  //   const zPosition = ((planes.length - 1) + index) * 0.001

  //   return new Vector3(0, yPosition, zPosition)
  // }, [mode, yStart])

  // const scale = useMemo(() => {
  //   return new Vector3(1.25, yScale, 1)
  // }, [yScale])

  const uSize = new Vector2(0, 0);
  const uScale = new Vector3(0, 0, 0);

  useFrame((props) => {
    const { viewport } = props;

    const el = container.current;
    const allPlanes = meshRef.current?.children;
    const size = viewport.getCurrentViewport();

    if (!el || !allPlanes) return;

    const aspectRatio = size.width / size.height;
    const normalizedSize = Math.max(size.width, size.height);

    const yStart = (((normalizedSize - size.height) / 2) + size.height) - size.height;

    uScale.set(1 * size.width, 1 * size.height, 1);

    const currentScroll = lenis?.scroll ?? window.scrollY;
    const progressRaw = ((currentScroll - el.offsetTop) + window.innerHeight) / (el.clientHeight)
    const progress = gsap.utils.clamp(0, 1, progressRaw);

    uSize.set(normalizedSize, normalizedSize);

    const isMobile = window.innerWidth < 800;

    allPlanes.forEach((plane, index) => {
      const curveProgress = (index * 1) * progress * (mode === 'enter' ? -1 : 1);
      const yOffset = (index * (normalizedSize * (isMobile ? 0.075 : 0.06)))
      const yPosition = (yStart + yOffset) * (mode === 'enter' ? 1 : -1)
      const zPosition = ((planes.length - 1) + index) * 0.001

      const uniforms = plane.material.uniforms;
      
      plane.material.uniforms.curveProgress.value = curveProgress * (isMobile ? size.height : size.width);
      plane.scale.set(uScale.x, uScale.y, uScale.z);

      if (typeof yPosition === 'number' && typeof zPosition === 'number') {
        plane.position.set(0, yPosition, zPosition);
      }

      uniforms.size.value = uSize;
      uniforms.aspect.value = aspectRatio;
    })
  })

  return (
    <mesh ref={meshRef}>
      {planes?.map((_, index) => {
        return (
          <CurvedPlane
            key={`transition-plane-${index}`}
            curveIntensity={3}
            inner={currentGradient?.outer}
            outer={currentGradient?.inner}
            center={index === (planes.length - 1) ? "#000000" : "#FFFFFF"}
            inset={1}
            opacity={1}
          />
        )
      })}
    </mesh>
  )
}