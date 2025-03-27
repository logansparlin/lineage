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

    const getIconPosition = () => () => {
      const pinRect = pin.getBoundingClientRect();

      const positionBetween = getPositionBetween(pin, icon);

      return -1 * positionBetween - pinRect.height / 2 - iconRect.height / 2 - 3;
    }

    const isMobile = window.innerWidth <= 800;

    const illoTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: () => isMobile ? 'top bottom-=50%' : 'top top',
        end: () => isMobile ? 'bottom top-=100%' : 'bottom top-=150%',
        endTrigger: stepFourRef.current,
        scrub: true,
      }
    })

    illoTl.to('.rect-two', {
      scale: 0.7,
      transformOrigin: 'center center',
      autoAlpha: 0,
      duration: 0,
    }, 0)

    illoTl.to('.rect-three', {
      scale: 0.6,
      transformOrigin: 'center center',
      autoAlpha: 0,
      duration: 0,
    }, 0)

    illoTl.to('.star-one', {
      scale: 0.7,
      y: 80,
      x: () => isMobile ? -300 : -160,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0
    }, 0)
    
    illoTl.to('.star-two', {
      scale: 0.8,
      y: 80,
      x: () => isMobile ? 300 : 220,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0
    }, 0)

    illoTl.to('.star-three', {
      scale: 0.8,
      y: -50,
      x: () => isMobile ? 180 : 80,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0
    }, 0)

    illoTl.to('.rect-two', {
      autoAlpha: 1,
      duration: 0.5,
      ease: 'none',
    }, '>')

    illoTl.to('.rect-three', {
      autoAlpha: 1,
      duration: 0.5,
      ease: 'none',
    }, '<')

    illoTl.to('.rect-one', {
      scale: 1.35,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0.7
    }, '<')

    illoTl.to('.rect-two', {
      scale: 1.6,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0.85
    }, '<')

    illoTl.to('.rect-three', {
      scale: 1.5,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, '<')

    illoTl.to('.star-one', {
      scale: () => isMobile ? 1 : 1.25,
      y: -40,
      x: 60,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)
    
    illoTl.to('.star-two', {
      scale: 1,
      y: -20,
      x: -20,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)

    illoTl.to('.star-three', {
      scale: () => isMobile ? 1 : 1.25,
      y: 60,
      x: -80,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1
    }, 0)

    illoTl.to(icon, {
      y: getIconPosition(),
      duration: () => isMobile ? illoTl.duration() * 0.65 : illoTl.duration() * 0.5,
      ease: 'none',
    }, 0)

    illoTl.to(illo, {
      scale: 1.1,
      transformOrigin: 'center center',
      ease: 'none',
      duration: () => isMobile ? illoTl.duration() * 0.5 : illoTl.duration() * 0.65,
    }, 0)
  }, {
    scope: stepFourRef.current
  });
};

