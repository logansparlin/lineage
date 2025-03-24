'use client';

import dynamic from "next/dynamic";

import { View } from "@react-three/drei";
import { BackgroundTrail } from "../background-trail/background-trail";
import { SRGBColorSpace } from "three";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export const CaseStudyCanvas = ({ colors }: { colors: string[] }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }} 
        gl={{
          antialias: true,
          alpha: true,
          depth: true,
          outputColorSpace: SRGBColorSpace,
          precision: 'highp',
          powerPreference: 'high-performance',
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
        <View.Port />
      </Canvas>
      <View className="absolute inset-0 w-full h-full z-[2]">
        <BackgroundTrail colors={colors} />
      </View>
    </div>
  )
}