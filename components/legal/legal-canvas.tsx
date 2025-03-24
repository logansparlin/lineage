'use client';

import dynamic from "next/dynamic";
import { BackgroundTrail } from "../background-trail/background-trail";
import { SRGBColorSpace } from "three";
import { memo } from "react";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export const LegalCanvas = memo(() => {
  return (
    <div className="fixed inset-0 w-full h-full z-[0] pointer-events-none">
      <Canvas
        linear
        dpr={[1, 3]}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }} 
        eventSource={typeof window !== 'undefined' ? document.querySelector('.legal-layout') as HTMLElement : undefined}
        gl={{
          antialias: true,
          alpha: true,
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
        <BackgroundTrail colors={['#FBC504', '#FF7EC5', '#01C2FF', '#00BF57']} />
      </Canvas>
    </div>
  )
})