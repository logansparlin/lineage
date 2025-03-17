import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { getPositionBetween } from "@/lib/get-position-between";

export const useStepTwoAnimation = (stepTwoRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepTwoRef.current;
    const details = stepTwoRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepTwoRef.current?.querySelector('.step-icon');
    const pin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin');
    const illo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    
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

    const groupOneHighlights = illo.querySelector('.group-one');
    const groupTwoHighlights = illo.querySelector('.group-two');
    const groupThreeHighlights = illo.querySelector('.group-three');

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepTwoRef.current,
        start: `top top`,
        end: 'bottom top-=200%',
        scrub: 1,
      }
    })

    mainTl.to(icon, {
      y: () => -1 * getPositionBetween(pin, icon) - pinRect.height / 2 - iconRect.height / 2,
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
  }, {
    dependencies: [stepTwoRef]
  });
};

