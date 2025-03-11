'use client';

import { useEffect, useState, useRef, useMemo } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { urlFor } from "@/sanity/lib/image";
import { Image } from "@/sanity/types";

interface FaviconProps {
  icons: {
    one?: Image
    two?: Image
    three?: Image
    four?: Image
  }
}

const indexMap = {
  one: 0,
  two: 1,
  three: 2,
  four: 3,
}

export const Favicon = ({ icons }: FaviconProps) => {
  const [tabFocused, setTabFocused] = useState(true);
  const currentStep = useSiteStore((state) => state.currentStep);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndex = useRef(0);
  
  const faviconSources = useMemo(() => {
    const sources = [];

    Object.keys(icons).forEach((key) => {
      if (icons[key as keyof typeof icons]) {
        const url = urlFor(icons[key as keyof typeof icons]).url();
        sources.push(url);
      }
    })

    return sources;
  }, [icons])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabFocused(document.visibilityState === 'visible');
    }

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    }
  }, [])

  const setFavicon = (url: string) => {
    if (typeof window === 'undefined') return;

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  useEffect(() => {
    if (!tabFocused) {
      intervalRef.current = setInterval(() => {
        setFavicon(faviconSources[currentIndex.current]);
        currentIndex.current = (currentIndex.current + 1) % faviconSources.length;
      }, 250);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setFavicon(faviconSources[0]);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [tabFocused])

  useEffect(() => {
    if (currentStep) {
      setFavicon(faviconSources[indexMap[currentStep as keyof typeof indexMap]]);
    }
  }, [currentStep])
  
  return null;
}