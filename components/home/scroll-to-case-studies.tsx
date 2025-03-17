'use client';

import { useIsomorphicLayoutEffect } from "react-use";
import { useLenis } from "lenis/react";
import { useParams } from "next/navigation";

export const ScrollToCaseStudies = () => {
  const lenis = useLenis();
  const params = useParams();
  
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    if (hash && lenis) {
      lenis.scrollTo(hash, { immediate: true })
    }
  }, [params, lenis])

  return null; 
}
    