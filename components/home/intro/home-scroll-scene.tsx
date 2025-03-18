'use client';

import { View } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber"
import { ReflectionShader } from "@/shaders/reflection-shader";
import { BoxGradient } from "@/shaders/box-gradient";
import { BlurShader } from "@/shaders/blur-shader";
import { SRGBColorSpace } from "three";

extend({ ReflectionShader, BoxGradient, BlurShader })

export const HomeScrollScene = () => {
  return (
    <Canvas
      linear
      gl={{ antialias: true, alpha: true, outputColorSpace: SRGBColorSpace }}
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
    </Canvas>
  )
}
