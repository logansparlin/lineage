import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

export const useStepThreeAnimation = (stepThreeRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepThreeRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepThreeRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepThreeRef.current?.querySelector('.step-three-pin');
    const illo: HTMLElement = stepThreeRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const iconRect = icon.getBoundingClientRect();
    const pinR = parseFloat(pin.getAttribute('data-r') || '0');
    
    const iconPinTop = (pinR) - (iconRect.height / 2) + 100;
    const trackingPinTop = -1 * pinR - (iconRect.height / 2) + 8

    const boxLeftHighlight = illo.querySelector('.box-left-highlight');
    const boxCenterHighlight = illo.querySelector('.box-center-highlight');
    const boxRightHighlight = illo.querySelector('.box-right-highlight');

    const trackingCirclesContainer = illo.querySelectorAll('.tracking-circles-container');

    const trackingCircleItems = gsap.utils.toArray('.tracking-circle');

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepThreeRef.current,
        start: `top top`,
        end: 'bottom top',
        scrub: true,
      }
    })

    mainTl.to(icon, {
      scrollTrigger: {
        trigger: icon,
        start: `top ${iconPinTop}px`,
        end: `bottom top+=${pinR * 4}px`,
        endTrigger: stepThreeRef.current,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        pinType: 'transform',
        anticipatePin: 0.05
      }
    }, 0)

    mainTl.to(trackingCirclesContainer, {
      scrollTrigger: {
        trigger: trackingCirclesContainer,
        endTrigger: stepThreeRef.current,
        start: `top ${trackingPinTop}px`,
        end: `bottom top+=${pinR * 4}px`,
        scrub: true,
        pin: true,
        pinSpacing: false,
        pinReparent: true,
        pinType: 'transform',
        anticipatePin: 0.05
      }
    }, 0)

    trackingCircleItems?.forEach((item: any) => {
      const r = item.getAttribute('data-r');
      mainTl.to(item, {
        r,
        duration: 0.2,
        scrollTrigger: {
          trigger: illo,
          start: `top top+=${trackingPinTop + (pinR / 2)}px`,
          end: `top top-=${pinR * 2}px`
        }
      }, 0)
    })

    mainTl.to(boxCenterHighlight, {
      opacity: 1,
      duration: 0.75,
      scrollTrigger: {
        trigger: boxCenterHighlight,
        endTrigger: stepThreeRef.current,
        start: 'top top+=50%',
        end: 'bottom top+=50%'
      }
    }, 0)

    mainTl.to(boxLeftHighlight, {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: boxRightHighlight,
        endTrigger: stepThreeRef.current,
        start: 'top top+=30%',
        end: 'bottom top+=50%'
      }
    }, 0)

    mainTl.to(boxRightHighlight, {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: boxRightHighlight,
        endTrigger: stepThreeRef.current,
        start: 'top top+=30%',
        end: 'bottom top+=50%'
      }
    }, 0)

    mainTl.to({}, {}, '+=0.85')
  });
};

