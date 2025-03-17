import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";

export const useStepFourAnimation = (stepFourRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepFourRef.current;
    const details = stepFourRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepFourRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepFourRef.current?.querySelector('.step-four-pin');
    const illo: HTMLElement = stepFourRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const iconRect = icon.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();

    const illoTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top-=100%',
        endTrigger: stepFourRef.current,
        scrub: true,
      }
    })

    illoTl.to('.rect-one', {
      scale: 1.35,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0.7
    }, 0.3)

    illoTl.to('.rect-two', {
      scale: 1.55,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0.85
    }, 0.15)

    illoTl.to('.rect-three', {
      scale: 1.45,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)

    illoTl.to('.star-one', {
      scale: 1.25,
      y: -40,
      x: 60,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)
    
    illoTl.to('.star-two', {
      scale: 0.95,
      y: -20,
      x: -20,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)

    illoTl.to('.star-three', {
      scale: 1.15,
      y: 30,
      x: -40,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)

    illoTl.to(icon, {
      y: () => -1 * getPositionBetween(pin, icon) - pinRect.height / 2 - iconRect.height / 2 - 2,
      duration: () => illoTl.duration() * 0.75,
      ease: 'none',
    }, 0)

    illoTl.to(illo, {
      scale: 1.1,
      transformOrigin: 'center center',
      ease: 'none',
      duration: () => illoTl.duration() * 0.75,
    }, 0)
  }, {
    scope: stepFourRef.current
  });
};

