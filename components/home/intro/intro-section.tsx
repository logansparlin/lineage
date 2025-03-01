import { useMemo, type FC, useRef } from "react";
import { cva } from "class-variance-authority";

interface IntroSectionProps {
  text: string;
  svg?: any;
  description?: string;
  variant?: 'first' | 'second' | 'last' | 'default';
}

const introSectionStyles = cva('sticky top-0 z-[2]', {
  variants: {
    variant: {
      default: 'min-h-[100svh] -mt-[100svh]',
      first: 'min-h-[250svh] -mt-[100px]',
      second: 'min-h-[200svh] -mt-[100px]',
      last: 'min-h-[200svh] -mt-[100px]',
    }
  }
})

export const IntroSection: FC<IntroSectionProps> = ({ text, variant }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionClass = useMemo(() => `intro-section-${variant}`, [variant])

  return (
    <div ref={sectionRef} className={`${introSectionStyles({ variant })} ${sectionClass}`}>
      <div className={`section-title sticky top-0 flex items-center justify-center min-h-[100svh]`}>
        <h2 className={'sr-only'}>{text}</h2>
      </div>
    </div>
  )
}