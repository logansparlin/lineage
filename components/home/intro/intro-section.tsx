import { useMemo, type FC, useRef } from "react";
import { getIntroTimeline } from "./intro-timelines";
import { useHomeStore } from "@/components/home/hooks/use-home-store";
import { useGSAP } from "@gsap/react";
import { cva } from "class-variance-authority";

import { Image } from "@/components/global/image";

interface IntroSectionProps {
  text: string;
  svg?: any;
  description?: string;
  variant?: 'first' | 'second' | 'last' | 'default';
}

const introSectionStyles = cva('sticky top-0 text-58 z-[2]', {
  variants: {
    variant: {
      first: 'min-h-[250svh]',
      second: 'min-h-[200svh]',
      last: 'min-h-[300svh]',
      default: 'min-h-[100svh]',
    }
  }
})

export const IntroSection: FC<IntroSectionProps> = ({ text, svg, description, variant }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionClass = useMemo(() => `intro-section-${variant}`, [variant])
  const planeRefs = useHomeStore((state) => state.planeRefs)
  const bottomPlaneRefs = useHomeStore((state) => state.bottomPlaneRefs)
  const tlRef = useRef<any>(null);

  useGSAP(() => {
    setTimeout(() => {
      const planes = Object.values(planeRefs);
      const bottomPlanes = Object.values(bottomPlaneRefs);
      
      if (tlRef.current || !planes?.length) return;

      tlRef.current = getIntroTimeline({
        variant,
        container: sectionRef.current,
        planes,
        bottomPlanes,
      })
    }, 10)
  }, {
    scope: sectionRef.current,
    dependencies: [planeRefs]
  })

  return (
    <div ref={sectionRef} className={`${introSectionStyles({ variant })} ${sectionClass}`}>
      <div className={`section-title sticky top-0 flex items-center justify-center min-h-[100svh] ${variant !== 'first' ? 'opacity-0' : ''}`}>
        <h2 className={svg ? 'sr-only' : ''}>{text}</h2>
        {svg ? (
          <Image
            image={svg}
            alt={text}
            className="w-auto h-45"
            height={100}
            style={{
              aspectRatio: svg.aspectRatio
            }}
          />
        ) : null}
      </div>
    </div>
  )
}