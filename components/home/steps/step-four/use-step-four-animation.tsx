import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";

export const useStepFourAnimation = (stepFourRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepFourRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepFourRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepFourRef.current?.querySelector('.step-four-pin');
    const illo: HTMLElement = stepFourRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const illoSvg = illo.querySelector('.step-illo-svg');

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    
    const distance = getPositionBetween(icon, pin);
    
    const iconPinTop = distance - (pinRect.height / 2) - (iconRect.height / 2);


    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepFourRef.current,
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
        endTrigger: stepFourRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05
      }
    }, 0)

    mainTl.to(illo, {
      zIndex: 1,
      scrollTrigger: {
        trigger: illo,
        start: 'top 40px',
        end: 'bottom bottom',
        endTrigger: stepFourRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05,
      }
    })

    mainTl.to(illoSvg, {
      scale: 1.25,
      scrollTrigger: {
        trigger: illo,
        start: 'top 40px',
        end: 'bottom bottom',
        endTrigger: stepFourRef.current,
        scrub: true,
      }
    })

  });
};

