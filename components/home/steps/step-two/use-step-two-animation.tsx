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
    const pin: HTMLElement = stepTwoRef.current?.querySelector('.step-two-pin');
    const illo: HTMLElement = stepTwoRef.current?.querySelector('.step-illo');

    if (!details || !icon || !pin || !illo) return;

    const pinRect = pin.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    
    const getIconScale = () => () => {
      const pinRect = pin.getBoundingClientRect();
      const iconSvg = icon.querySelector('svg');
      const iconSvgRect = iconSvg?.getBoundingClientRect();

      return pinRect.width / iconSvgRect.width;
    }

    const groupOneHighlights = illo.querySelector('.group-one');
    const groupTwoHighlights = illo.querySelector('.group-two');
    const groupThreeHighlights = illo.querySelector('.group-three');

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepTwoRef.current,
        start: () => window.innerWidth > 800 ? 'top top' : 'top bottom-=50%',
        end: () => window.innerWidth > 800 ? 'bottom top-=150%' : 'bottom top-=100%',
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

    ScrollTrigger.refresh();
  }, {
    dependencies: [stepTwoRef]
  });
};

