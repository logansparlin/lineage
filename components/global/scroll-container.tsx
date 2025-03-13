'use client';

import { type FC, type ComponentProps, useEffect, useRef, memo } from "react";
import { scrollConfig } from "@/lib/scroll-config";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.normalizeScroll(true)

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
  invalidateOnRefresh: false,
})

interface ScrollContainerProps extends ComponentProps<'div'> {}

export const ScrollContainer: FC<ScrollContainerProps> = memo(({ children, ...props }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const update = (time) => {
      // time * 1000 converts to milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
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
