'use client'

import { useEffect, useRef, type FC, type ComponentProps } from 'react';
import { useHomeSteps } from './use-home-steps';
import { useInView } from 'framer-motion';

interface StepObserverProps extends ComponentProps<'div'> {
  step: string
}

export const StepObserver: FC<StepObserverProps> = ({ step, children }) => {
  const currentStep = useHomeSteps((state) => state.currentStep)
  const setCurrentStep = useHomeSteps((state) => state.setCurrentStep)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  useEffect(() => {
    if (!setCurrentStep) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentStep(step);
        }
      })
    }, {
      rootMargin: '0px',
      threshold: 0,
    });

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        intersectionObserver.disconnect();
      }
    }
  }, [])

  return (
    <div className={`w-full ${isInView ? 'visible': 'invisible'}`} id={`step-${step}`} ref={containerRef}>
      {children}
    </div>
  )
}