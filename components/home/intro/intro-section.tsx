import { useMemo, type FC, useRef } from "react";
import { cva } from "class-variance-authority";

interface IntroSectionProps {
  text: string;
  svg?: any;
  description?: string;
  variant?: 'first' | 'second' | 'last' | 'default';
}

const introSectionStyles = cva('relative z-[2]', {
  variants: {
    variant: {
      default: 'min-h-[200svh]',
      first: 'min-h-[250svh] -mt-[100svh]',
      second: 'min-h-[250svh]',
      last: 'min-h-[250svh]',
    }
  }
})

export const IntroSection: FC<IntroSectionProps> = ({ text, variant }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionClass = useMemo(() => `intro-section-${variant}`, [variant])

  return (
    <div ref={sectionRef} className={`${introSectionStyles({ variant })} ${sectionClass}`}>
      <div className={`section-title relative flex items-center justify-center min-h-[100svh]`}>
        <h2 className={'sr-only'}>{text}</h2>
      </div>
    </div>
  )
}