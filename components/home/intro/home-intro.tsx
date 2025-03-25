'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTitlesAnimation } from "./use-titles-animation";
import { useSiteStore } from "@/stores/use-site-store";
import { useInView } from "motion/react";

import { ScrollIndicator } from "./scroll-indicator";
import { IntroSection } from "./intro-section";
import { IntroScene } from "../../scenes/intro";
import { TransitionScene } from "../../scenes/transition";
import { Image } from "@/components/global/image";
import { View } from "@react-three/drei";

export const HomeIntro = ({ titles, description }) => {
  const setColorButtonVisible = useSiteStore((state) => state.setColorButtonVisible);
  const colorButtonVisible = useSiteStore((state) => state.colorButtonVisible);
  
  const introRef = useRef<HTMLDivElement>(null);
  const inView = useInView(introRef, { once: false });
  const [hasScrolled, setHasScrolled] = useState(false);

  const getFormattedVariant = useCallback((index: number) => {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === titles.length - 1) return 'last';
    return 'default';
  }, []);

  const sectionClasses = useMemo(() => {
    return titles?.map((_, index) => `.intro-section-${getFormattedVariant(index)}`) ?? []
  }, [titles])

  useTitlesAnimation({ container: introRef, sections: sectionClasses })

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

  return (
    <section className="w-full" id="home-intro">
      <div className="relative">
        <div ref={introRef} className="home-intro-container relative w-full h-fit z-[1]">
          <ScrollIndicator />
          
          <div className="home-intro-main w-full h-screen sticky top-0 grid-contain z-[5] text-white place-items-center">
            <View className="absolute inset-0 w-full h-screen pointer-events-none -z-[1]">
              <IntroScene
                sections={sectionClasses}
              />
            </View>
            {titles?.map((title, index) => {
              const variant = getFormattedVariant(index);

              return (
                <div 
                  key={title._key} 
                  inert
                  aria-hidden
                  className={`px-20 flex flex-col items-center justify-center intro-title-${variant} ${variant !== 'first' ? 'invisible' : ''}`}
                >
                  {title?.svg ? (
                    <div className="title-image max-md:w-[78%] relative pb-4 md:pb-6">
                      <Image
                        image={title.svg}
                        alt={title.text}
                        className="w-auto h-24 md:h-45 mx-auto"
                        height={100}
                        style={{
                          aspectRatio: title.svg.aspectRatio,
                        }}
                      />
                    </div>
                  ) : (
                    <span
                      className="text-32 md:text-58 !leading-[100%] font-medium"
                    >
                      {title.text}
                    </span>
                  )}

                  {variant === 'last' && description ? (
                    <div
                      className="home-intro-description max-md:font-medium w-[78%] md:w-full max-w-800 text-18 md:text-32 h-0 overflow-hidden will-change-auto transform-gpu"
                      style={{
                        maskImage: 'linear-gradient(to top, transparent, black 80px)'
                      }}
                    >
                      <div className="flex flex-col gap-y-[1.1em] py-30 pb-50 max-md:pb-80 md:py-80">
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
        
        <TransitionScene mode="exit" />
      </div>
    </section>
  )
}