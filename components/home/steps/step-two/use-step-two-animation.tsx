import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";

export const useStepTwoAnimation = (stepTwoRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const details = stepTwoRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepTwoRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin');
    const illo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;
    
    const getIconScale = () => () => {
      const pinRect = pin.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();

      return pinRect.width / iconRect.width;
    }
    
    const getIconPinStart = () => () => {
      const iconRect = icon.getBoundingClientRect();
      const iconScale = getIconScale();
      const pinDistance = getPositionBetween(pin, illo);
      const iconExtraHeight = (iconScale() - 1) * iconRect.height
      const iconPinTop = pinDistance + (iconRect.height - (iconExtraHeight / 2));
      return `top ${-1 * iconPinTop}px`
    }

    const groupOneHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-one .highlight'));
    const groupTwoHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-two .highlight'));
    const groupThreeHighlights = gsap.utils.toArray(illo.querySelectorAll('.group-three .highlight'));

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepTwoRef.current,
        start: `top top`,
        end: 'bottom top',
        scrub: 1,
      }
    })

    mainTl.to(icon, {
      scale: getIconScale(),
      duration: 0.5,
    }, 0)

    mainTl.to({}, {}, '+=1')

    const iconPin = gsap.timeline({
      scrollTrigger: {
        trigger: icon,
        start: getIconPinStart(),
        end: 'bottom bottom',
        endTrigger: stepTwoRef.current,
        scrub: 1,
        pin: true,
        pinType: 'fixed',
        pinSpacing: false,
        pinReparent: true,
        anticipatePin: 0.01
      }
    })

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
  }, {
    dependencies: [stepTwoRef]
  });
};

