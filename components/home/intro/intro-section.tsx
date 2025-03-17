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
      default: 'min-h-screen-200',
      first: 'min-h-screen-250 -mt-screen',
      second: 'min-h-screen-250',
      last: 'min-h-screen-250',
    }
  }
})

export const IntroSection: FC<IntroSectionProps> = ({ text, variant }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionClass = useMemo(() => `intro-section-${variant}`, [variant])

  return (
    <div ref={sectionRef} data-title={`.intro-title-${variant}`} className={`${introSectionStyles({ variant })} ${sectionClass}`}>
      <div className={`section-title relative flex items-center justify-center min-h-screen`}>
        <h2 className={'sr-only'}>{text}</h2>
      </div>
    </div>
  )
}