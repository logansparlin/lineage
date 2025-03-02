import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";

export const useStepOneAnimation = (stepOneRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepOneRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepOneRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepOneRef.current?.querySelector('.step-one-pin');
    const illo: HTMLElement = stepOneRef.current?.querySelector('.step-illo');
    
    if (!details || !icon || !pin) return;

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    const iconPinTop = (pinRect.height / 2) - (iconRect.height / 2) + 40;


    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepOneRef.current,
        start: `top top`,
        end: 'bottom top',
        scrub: true,
      }
    })

    mainTl.to(icon, {
      zIndex: 5,
      scrollTrigger: {
        trigger: icon,
        start: `top ${iconPinTop}px`,
        end: 'bottom bottom',
        endTrigger: stepOneRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05,
      }
    })

    mainTl.to(illo, {
      scrollTrigger: {
        trigger: illo,
        start: 'top 40px',
        end: 'bottom bottom',
        endTrigger: stepOneRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05,
      }
    })

    const circles = gsap.utils.toArray('.circle-path');

    if (!circles) return;

    const illoTl = gsap.timeline({
      scrollTrigger: {
        trigger: illo,
        start: 'top bottom-=50%',
        end: 'bottom bottom',
        endTrigger: stepOneRef.current,
        scrub: true,
      }
    })

    circles.forEach((circle: HTMLElement, index: number) => {
      illoTl.to(circle, {
        opacity: 1,
        duration: 1,
        ease: 'power3.inOut',
      }, '<')

      illoTl.to(circle, {
        opacity: index < circles.length - 1 ? 0 : 1,
        duration: 1,
        ease: 'power3.inOut',
      }, '>')
    })


    mainTl.add(illoTl);
  }, {
    scope: stepOneRef,
  });
};

