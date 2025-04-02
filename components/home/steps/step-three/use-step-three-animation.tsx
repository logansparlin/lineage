import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

export const useStepThreeAnimation = (stepThreeRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepThreeRef.current;
    const details = stepThreeRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepThreeRef.current?.querySelector('.step-icon');
    const illo: HTMLElement = stepThreeRef.current?.querySelector('.step-illo');
    const svg: any = illo?.querySelector('svg');
    const trackingCircles = gsap.utils.toArray('.tracking-circle');

    if (!details || !icon || !illo || !trackingCircles) return;

    const iconHeight = icon.clientHeight;

    const boxLeftHighlight = illo.querySelector('.box-left-highlight');
    const boxCenterHighlight = illo.querySelector('.box-center-highlight');
    const boxRightHighlight = illo.querySelector('.box-right-highlight');

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: () => window.innerWidth > 800 ? 'top top' : 'top bottom-=50%',
        end: () => window.innerWidth > 800 ? 'bottom top-=150%' : 'bottom top-=100%',
        scrub: true,
      }
    })

    trackingCircles.forEach((circle: HTMLElement) => {
      const scale = parseFloat(circle.getAttribute('data-scale') || '0');

      mainTl.to(circle, {
        scale: () => window.innerWidth > 800 ? scale : scale / 1.5,
        duration: 0.4,
      }, 0.3)
    })

    mainTl.to(boxCenterHighlight, {
      opacity: 1,
      duration: 1,
    }, 0)

    mainTl.to(boxRightHighlight, {
      opacity: 1,
      duration: 1,
    }, '>')

    mainTl.to(boxLeftHighlight, {
      opacity: 1,
      duration: 1,
    }, '>-=0.5')

    mainTl.to(icon, {
      y: () => window.innerWidth > 800 ? (window.innerHeight - (iconHeight * 5)) : (window.innerHeight - (iconHeight * 3)),
      scale: () => window.innerWidth > 800 ? 1 : 0.75,
      duration: () => window.innerWidth > 800 ? mainTl.duration() : mainTl.duration() * 0.5,
    }, 0)

    mainTl.to(svg, {
      scale: () => 1,
      duration: () => mainTl.duration() * 0.75,
    }, mainTl.duration() * 0.25)
  }, {
    dependencies: [stepThreeRef]
  });
};

