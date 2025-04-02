import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useStepTwoAnimation = (stepTwoRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepTwoRef.current;
    const details = stepTwoRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepTwoRef.current?.querySelector('.step-icon');
    const illo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo');
    const pin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin');
    const mobileIllo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo .illo-mobile');
    const mobilePin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin-mobile');

    if (!details || !icon || !pin || !illo) return;
    const iconRect = icon.getBoundingClientRect();
    
    const getIconScale = () => () => {
      const pinRect = pin.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      const iconSvg = icon.querySelector('svg');

      return pinRect.height / iconRect.height;
    }

    const calculateMobileIconScale = (pinScale: number = 1) => {
      const pinRect = mobilePin.getBoundingClientRect();
      const iconSvg = icon.querySelector('svg');

      const scale = ((pinRect.height + 2) * pinScale) / icon.clientHeight
      
      return scale;
    }

    const getMobileIconScale = (pinScale: number = 1) => () => {
      return calculateMobileIconScale(pinScale);
    }

    const getMobileIconPosition = () => () => {
      const pinRect = mobilePin.getBoundingClientRect();

      const positionBetween = getPositionBetween(mobilePin, icon);

      return -1 * positionBetween - pinRect.height;
    }

    const getIconPosition = () => () => {
      const pinRect = pin.getBoundingClientRect();

      const positionBetween = getPositionBetween(pin, icon);

      return -1 * positionBetween - pinRect.height;
    }
    
    const groupOneHighlights = illo.querySelector('.group-one');
    const groupTwoHighlights = illo.querySelector('.group-two');
    const groupThreeHighlights = illo.querySelector('.group-three');

    const groupOneHighlightsMobile = mobileIllo.querySelector('.group-one');
    const groupTwoHighlightsMobile = mobileIllo.querySelector('.group-two');
    const groupThreeHighlightsMobile = mobileIllo.querySelector('.group-three');

    const isMobile = window.innerWidth <= 800;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepTwoRef.current,
        start: () => isMobile ? 'top bottom-=50%' : 'top top',
        end: () => isMobile ? 'bottom top-=100%' : 'bottom top-=150%',
        scrub: 1,
      }
    })

    if (isMobile) {
      mainTl.to(icon, {
        y: getMobileIconPosition(),
        duration: 0.75,
        ease: 'none',
      }, 0)
  
      mainTl.to(icon, {
        scale: getMobileIconScale(),
        duration: 0.75,
      }, 0)
  
      mainTl.to({}, {}, '>')
  
      mainTl.to(groupOneHighlightsMobile, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>-=0.5')
  
      mainTl.to(groupTwoHighlightsMobile, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>')
  
      mainTl.to(groupThreeHighlightsMobile, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>')

      mainTl.to(illo, {
        scale: 0.5,
        duration: 1.0,
      }, '>-=1.2')

      // mainTl.to(icon, {
      //   y: () => -1,
      //   duration: 0.5,
      // }, '<')

      mainTl.to(icon, {
        scale: getMobileIconScale(0.5),
      }, '<')
    } else {
      mainTl.to(icon, {
        y: getIconPosition(),
        duration: 0.75,
        ease: 'none',
      }, 0)
  
      mainTl.to(icon, {
        scale: getIconScale(),
        duration: 0.75,
      }, 0)
  
      mainTl.to({}, {}, '>')
  
  
      mainTl.to(groupOneHighlights, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>-=0.5')
  
      mainTl.to(groupTwoHighlights, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>')
  
      mainTl.to(groupThreeHighlights, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '>')
  
      mainTl.to({}, {}, '+=0.5')
    }

    ScrollTrigger.refresh();
  }, {
    dependencies: [stepTwoRef]
  });
};

