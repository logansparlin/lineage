'use client';

import { memo } from "react";
import { extend } from "@react-three/fiber"
import dynamic from "next/dynamic";

import { AdaptiveDpr } from "@react-three/drei";
import { ReflectionShader } from "@/shaders/reflection-shader";
import { BoxGradient } from "@/shaders/box-gradient";
import { BlurShader } from "@/shaders/blur-shader";
import { ImageShader } from "@/shaders/image-shader";
import { SRGBColorSpace } from "three";
import { View, Preload } from "@react-three/drei";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

extend({ ReflectionShader, BoxGradient, BlurShader, ImageShader })

export const HomeScrollScene = memo(() => {
  return (
    <Canvas
      linear
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 120, near: 0.01, far: 100 }} 
      gl={{
        antialias: true,
        alpha: true,
        outputColorSpace: SRGBColorSpace,
      }}
      resize={{
        scroll: false,
        debounce: {
          scroll: 0,
          resize: 250
        },
      }}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        inset: 0,
        zIndex: 1
      }}
    >
      <AdaptiveDpr />
      <View.Port />
      <Preload all />
    </Canvas>
  )
})
