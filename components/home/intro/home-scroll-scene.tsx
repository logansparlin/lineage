'use client';

import { memo, useMemo, useRef } from "react";
import { getRandomGradient } from "@/lib/gradients";

import { Mask, View } from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber"
import { ReflectionShader } from "@/shaders/reflection-shader";
import { BoxGradient } from "@/shaders/box-gradient";
import { BlurShader } from "@/shaders/blur-shader";
import { CurvedPlane } from "@/components/home/intro/curved-plane";
import { HomeIntroInteraction } from "./home-intro-interaction";
import { HomeIntroColorSwitcher } from "./home-intro-color-switcher";
import { Vector3 } from "three";

extend({ ReflectionShader, BoxGradient, BlurShader })

export const HomeScrollScene = () => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, stencil: true }}
      resize={{
        scroll: false,
        debounce: 50,
      }}
      camera={{ position: [0, 0, 10], fov: 100, near: 0.1, far: 1000 }} 
      dpr={[1, 3]}
      shadows={true}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        inset: 0
      }}
    >
      <View.Port />
      {/* <Scene caseStudyGradient={caseStudyGradient} /> */}
    </Canvas>
  )
}

export const Masks = () => {
  const { viewport } = useThree();

  return (
    <>
      <Mask id={1} scale={[viewport.width / 1.5, (viewport.height * 0.15) / 1.5, 0]} position={[0, viewport.height * 0.33, 3]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[1, 1, 1, 1]} />
      </Mask>
      <Mask id={2} scale={[viewport.width / 1.5, (viewport.height * 0.15) / 1.5, 0]} position={[0, -1 * (viewport.height * 0.33), 3]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[1, 1, 1, 1]} />
      </Mask>
    </>
  )
}

// const Scene = ({ caseStudyGradient }: { caseStudyGradient: any }) => {
//   const { viewport } = useThree();
//   const meshRef = useRef<any>(null);
  
//   const gradient = useMemo(() => getRandomGradient(), []);

//   const aspectRatio = useMemo(() => {
//     const aspect = viewport.height / viewport.width;
//     return 1 / aspect;
//   }, [viewport]);

//   const normalizedSize = useMemo(() => {
//     return Math.max(viewport.width, viewport.height);
//   }, [viewport])

//   const introPlanesTop = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);
//   const introPlanesBottom = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

//   const exitPlanes = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

//   const curveIntensity = useMemo(() => {
//     return aspectRatio > 1 ? 3 : 1.5;
//   }, [aspectRatio])

//   return null;

//   return (
//     <>
//       <HomeIntroInteraction />
//       <HomeIntroColorSwitcher />
//       <mesh ref={meshRef} name="intro-mesh">
//         {introPlanesTop.map((step, index) => {
//           return (
//             <CurvedPlane
//               key={`step-${step}`}
//               name={`top-step-${step}`}
//               width={viewport.width}
//               height={viewport.height}
//               aspectRatio={aspectRatio}
//               curveIntensity={curveIntensity}
//               inner={gradient.inner}
//               outer={gradient.outer}
//               scale={new Vector3(0, 0, 0)}
//               position={new Vector3(0, 0, index * 0.001)}
//               opacity={1}
//             />
//           )
//         })}

//         {introPlanesBottom.map((step, index) => {
//           const yScale = aspectRatio > 1 ? 1.5 : 2.5;
//           const topFull = ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height)
//           const yPosition = -1 * (topFull + (index * (normalizedSize * 0.125)))

//           return (
//             <CurvedPlane
//               name={`bottom-step-${step}`}
//               key={`bottom-step-${step}`}
//               width={viewport.width}
//               height={viewport.height}
//               aspectRatio={aspectRatio}
//               curveIntensity={curveIntensity}
//               inner={gradient.outer}
//               outer={gradient.inner}
//               center={index === (introPlanesBottom.length - 1) ? "#000000" : "#FFFFFF"}
//               scale={new Vector3(2.5, yScale, 1)}
//               position={new Vector3(0, yPosition, ((introPlanesTop.length - 1) + index) * 0.001)}
//               inset={0.925}
//               opacity={1}
//             />
//           )
//         })}

//         {exitPlanes.map((step, index) => {
//           const yScale = 1.5;
//           const topFull = ((((normalizedSize * yScale) - viewport.height) / 2) + viewport.height)
//           const yPosition = (topFull + (index * (normalizedSize * 0.125))) - (normalizedSize * yScale)
//           // const zPosition = ((introPlanesTop.length - 1) + (introPlanesBottom.length - 1) + index) * 0.001
//           const zPosition = index * 0.001

//           return (
//             <CurvedPlane
//               key={`exit-plane-${step}`}
//               name={`exit-plane-${step}`}
//               width={viewport.width}
//               height={viewport.height}
//               aspectRatio={aspectRatio}
//               curveIntensity={curveIntensity}
//               curveProgress={-1 * (index * 1)}
//               inner={caseStudyGradient?.outer}
//               outer={caseStudyGradient?.inner}
//               center={index === (exitPlanes.length - 1) ? "#000000" : "#FFFFFF"}
//               scale={new Vector3(3, yScale, 1)}
//               position={new Vector3(0, yPosition, zPosition)}
//               inset={0.985}
//               opacity={0}
//             />
//           )
//         })}
//       </mesh>
//     </>
//   )
// }
