'use client';

import { type FC, type ComponentProps, useEffect, useRef, memo } from "react";
import { scrollConfig } from "@/lib/scroll-config";
import { addEffect } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import 'lenis/dist/lenis.css'
import { ScrollTriggerUpdate } from "./scroll-trigger-update";

gsap.registerPlugin(ScrollTrigger);

interface ScrollContainerProps extends ComponentProps<'div'> {}

export const ScrollContainer: FC<ScrollContainerProps> = memo(({ children, ...props }) => {
  const lenisRef = useRef<any>(null);

  useGSAP(() => {
    gsap.config({ force3D: true });

    // ScrollTrigger.refresh();

    ScrollTrigger.defaults({
      immediateRender: false,
      scrub: true,
      invalidateOnRefresh: false,
    })

    gsap.config({ force3D: true });
    
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.remove(gsap.updateRoot);

    ScrollTrigger.clearScrollMemory('manual')

    const update = (time) => {
      // time * 1000 converts to milliseconds
      lenisRef.current?.lenis?.raf(time);
      gsap.updateRoot(time / 1000)
    }

    addEffect(update);
    // gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    }
  })

  // return (<div>{children}</div>)

  return (
    <ReactLenis
      root
      ref={lenisRef}
      className="relative"
      options={{
        ...scrollConfig,
        easing: (t) => Math.min(1,1.001-Math.pow(2,-10*t)),
        infinite: true,
        autoRaf: false,
        syncTouchLerp: 0.07,
        touchMultiplier: 1,
        touchInertiaMultiplier: 30
      }}
    >
      <ScrollTriggerUpdate />
      {children}
    </ReactLenis>
  )
})
