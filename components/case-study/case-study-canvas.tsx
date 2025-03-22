'use client';

import dynamic from "next/dynamic";
import { BackgroundTrail } from "../background-trail/background-trail";
import { SRGBColorSpace } from "three";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export const CaseStudyCanvas = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none">
      <Canvas
        linear
        dpr={[1, 3]}
        // eventSource={typeof window !== 'undefined' ? document.querySelector('.case-layout') as HTMLElement : undefined}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }} 
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
        <BackgroundTrail colors={['#FBC504', '#FF7EC5', '#01C2FF', '#00BF57']} />
      </Canvas>
    </div>
  )
}