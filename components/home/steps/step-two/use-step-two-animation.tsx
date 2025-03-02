import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useStepTwoAnimation = (stepTwoRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepTwoRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepTwoRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin');
    const illo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    console.log(pinRect)
    
    const iconPinTop = (pinRect.height / 2) - (iconRect.height / 2) + 40;

    const iconScaleX = pinRect.width / iconRect.width;
    const iconScaleY = pinRect.height / iconRect.height;

    const groupOneHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-one .highlight'));
    const groupTwoHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-two .highlight'));
    const groupThreeHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-three .highlight'));

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepTwoRef.current,
        start: `top top`,
        end: 'bottom top',
        markers: true,
        scrub: true,
      }
    })

    mainTl.to(icon, {
      scale: iconScaleX,
      duration: 0.15,
    }, 0)

    mainTl.to({}, {}, '+=1')

    mainTl.to(icon, {
      scrollTrigger: {
        trigger: icon,
        start: `top ${iconPinTop}px`,
        end: 'bottom bottom',
        endTrigger: stepTwoRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05
      }
    }, 0)

    mainTl.to(illo, {
      scrollTrigger: {
        trigger: illo,
        start: 'top 40px',
        end: 'bottom bottom',
        endTrigger: stepTwoRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.05
      }
    }, 0)

    groupOneHighlights.forEach((highlight: HTMLElement, index: number) => {
      mainTl.to(highlight, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0.25)
    })

    groupTwoHighlights.forEach((highlight: HTMLElement, index: number) => {
      mainTl.to(highlight, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0.75)
    })

    groupThreeHighlights.forEach((highlight: HTMLElement, index: number) => {
      mainTl.to(highlight, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 1.25)
    })

    mainTl.to({}, {}, '+=0.5')

  });
};

