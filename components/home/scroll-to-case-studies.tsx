'use client';

import { useSiteStore } from "@/stores/use-site-store";
import { useIsomorphicLayoutEffect } from "react-use";
import { useLenis } from "lenis/react";
import { useParams } from "next/navigation";

export const ScrollToCaseStudies = () => {
  const subscribe = useSiteStore((state) => state.subscribe);
  
  const params = useParams();
  const lenis = useLenis();
  
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    if (hash && lenis) {
      lenis.scrollTo(hash, { immediate: true })
      window.history.replaceState({}, '', window.location.pathname)
    }

    const unsubscribe = subscribe('scroll-to-top', () => {
      lenis?.scrollTo(0)
    })

    return () => {
      unsubscribe?.();
    }
  }, [params, lenis])

  return null; 
}
    