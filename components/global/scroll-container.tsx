'use client';

import { type FC, type ComponentProps, useEffect, useRef, memo } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
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
        anchors: true,
        autoRaf: false,
        syncTouch: false,
        touchMultiplier: 2,
      }}
      className="overflow-auto"
    >
      {children}
    </ReactLenis>
  )
})
