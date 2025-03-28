import { type RefObject } from "react";
import { getPositionBetween } from "@/lib/get-position-between";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";

export const useStepOneAnimation = (stepOneRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepOneRef.current;
    const details = stepOneRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepOneRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepOneRef.current?.querySelector('.step-one-pin');
    
    if (!details || !icon || !pin) return;

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    const circles = gsap.utils.toArray('.circle-path');

    if (!circles) return;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: () => window.innerWidth > 800 ? 'top top' : 'top bottom-=70%',
        end: () => window.innerWidth > 800 ? 'bottom top-=150%' : 'bottom top-=100%',
        scrub: true,
      }
    })

    mainTl.to(icon, {
      y: () => -1 * getPositionBetween(pin, icon) - pinRect.height / 2 - iconRect.height / 2,
      duration: () => 1.5,
      ease: 'power1.inOut',
    }, 0)

    circles.forEach((circle: HTMLElement, index: number) => {
      mainTl.to(circle, {
        opacity: 1,
        duration: 1,
        ease: 'power3.inOut',
      }, index === 0 ? '>-=0.5' : '<')

      mainTl.to(circle, {
        opacity: () => index < circles.length - 1 ? 0 : 1,
        duration: 1,
        ease: 'power3.inOut',
      }, '>')
    })
  }, {
    scope: stepOneRef,
  });
};

