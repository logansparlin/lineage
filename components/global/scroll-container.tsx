'use client';

import { type FC, type ComponentProps, useEffect, useRef, memo } from "react";
import { scrollConfig } from "@/lib/scroll-config";
import { addEffect } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger);

interface ScrollContainerProps extends ComponentProps<'div'> {}

export const ScrollContainer: FC<ScrollContainerProps> = memo(({ children, ...props }) => {
  const lenisRef = useRef<any>(null);

  useGSAP(() => {
    gsap.config({ force3D: true });

    ScrollTrigger.refresh();

    ScrollTrigger.defaults({
      immediateRender: false,
      scrub: true,
      invalidateOnRefresh: false,
    })
  })

  useEffect(() => {
    const update = (time) => {
      // time * 1000 converts to milliseconds
      lenisRef.current?.lenis?.raf(time);
    }

    addEffect(update);
    // gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    }
  }, [])

  // return (<div>{children}</div>)

  return (
    <ReactLenis
      root
      ref={lenisRef}
      className="relative"
      options={{
        ...scrollConfig,
        infinite: true,
        autoRaf: false,
        touchMultiplier: 1.15,
        touchInertiaMultiplier: 20
      }}
    >
      {children}
    </ReactLenis>
  )
})
