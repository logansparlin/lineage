'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useSiteStore } from "@/stores/use-site-store";

import { HomeScrollScene } from "./home-scroll-scene";
import { IntroSection } from "./intro-section";
import { ScrollIndicator } from "./scroll-indicator";
import { Image } from "@/components/global/image";

export const HomeIntro = ({ titles, description }) => {
  const setColorButtonVisible = useSiteStore((state) => state.setColorButtonVisible);
  const colorButtonVisible = useSiteStore((state) => state.colorButtonVisible);
  
  const introRef = useRef<HTMLDivElement>(null);
  const inView = useInView(introRef, { once: false });
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView])

  useEffect(() => {
    if (inView && hasScrolled && !colorButtonVisible) {
      setColorButtonVisible(true);
    } else if ((!inView || !hasScrolled)) {
      setColorButtonVisible(false);
    }
  }, [inView, hasScrolled, colorButtonVisible, setColorButtonVisible])
  
  const getFormattedVariant = useCallback((index: number) => {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === titles.length - 1) return 'last';
    return 'default';
  }, [titles]);

  return (
    <section id="home-intro">
      <div className="relative">
        <div ref={introRef} className="home-intro-container relative w-full h-fit z-[1]">
          <ScrollIndicator />
          
          <div className="home-intro-main w-full h-[100svh] sticky top-0 grid-contain z-[5] text-white place-items-center">
            {titles?.map((title, index) => {
              const variant = getFormattedVariant(index);

              return (
                <div 
                  key={title._key} 
                  inert
                  aria-hidden
                  className={`flex flex-col items-center justify-center will-change-auto intro-title-${variant} ${variant !== 'first' ? 'opacity-0' : ''}`}
                >
                  {title?.svg ? (
                    <Image
                      image={title.svg}
                      alt={title.text}
                      className="w-auto h-45"
                      height={100}
                      style={{
                        aspectRatio: title.svg.aspectRatio
                      }}
                    />
                  ) : (
                    <span className="text-32 lg:text-58 font-medium">{title.text}</span>
                  )}

                  {variant === 'last' && description ? (
                    <div
                      className="home-intro-description max-w-800 text-18 lg:text-32 h-0 overflow-hidden"
                      style={{
                        maskImage: 'linear-gradient(to top, transparent, black 80px)'
                      }}
                    >
                      <div className="flex flex-col gap-y-[1.1em] py-80">
                        {description?.split('\n').map((line, index) => (
                          <p key={`description-line-${index}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          {titles?.map((title, index) => {
            return (
              <IntroSection
                key={`section-${title._key}`}
                variant={getFormattedVariant(index)}
                description={index === titles.length - 1 ? description : undefined}
                {...title}
              />
            )
          })}
        </div>
        
        <div className="intro-section-exit h-[400svh] -mt-[100svh]"></div>
        
        <HomeScrollScene />
      </div>
    </section>
  )
}