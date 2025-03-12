import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

export const useStepFourAnimation = (stepFourRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepFourRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepFourRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepFourRef.current?.querySelector('.step-four-pin');
    const illo: HTMLElement = stepFourRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const iconRect = icon.getBoundingClientRect();

    const iconPin = gsap.timeline({
      scrollTrigger: {
        trigger: icon,
        start: () => `top ${window.innerHeight / 2 - (iconRect.height / 2)}px`,
        end: 'bottom bottom',
        endTrigger: stepFourRef.current,
        scrub: true,
        pin: true,
        pinType: 'transform',
        pinSpacing: false,
        anticipatePin: 0.01
      }
    })

    const illoPin = gsap.timeline({
      scrollTrigger: {
        trigger: illo,
        start: 'top top',
        end: 'bottom bottom',
        endTrigger: stepFourRef.current,
        scrub: true,
        pin: true,
        pinType: 'transform',
        pinSpacing: false,
        anticipatePin: 0.01,
      }
    })

    const illoTl = gsap.timeline({
      scrollTrigger: {
        trigger: illo,
        start: 'top top',
        end: 'bottom bottom',
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
  }, {
    scope: stepFourRef.current
  });
};

