import { type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

export const useStepThreeAnimation = (stepThreeRef: RefObject<HTMLDivElement>) => {
  useGSAP(() => {
    const container = stepThreeRef.current;
    const details = stepThreeRef.current?.querySelector('.step-details');
    const icon: HTMLElement = stepThreeRef.current?.querySelector('.step-icon');
    const illo: HTMLElement = stepThreeRef.current?.querySelector('.step-illo');
    const trackingCircles = gsap.utils.toArray('.tracking-circle');

    if (!details || !icon || !illo || !trackingCircles) return;

    const iconHeight = icon.clientHeight;

    const boxLeftHighlight = illo.querySelector('.box-left-highlight');
    const boxCenterHighlight = illo.querySelector('.box-center-highlight');
    const boxRightHighlight = illo.querySelector('.box-right-highlight');

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top-=100%',
        scrub: true,
      }
    })

    // trackingCircleItems?.forEach((item: any, index: number) => {
    //   mainTl.fromTo(item, {
    //     scale: 0,
    //     opacity: 0,
    //     transformOrigin: 'center',
    //     duration: 1,
    //   }, {
    //     scale: 1,
    //     opacity: 0.2 + (index * 0.1),
    //     transformOrigin: 'center',
    //     duration: 1,
    //   }, 0)
    // })

    trackingCircles.forEach((circle: HTMLElement) => {
      const scale = parseFloat(circle.getAttribute('data-scale') || '0');

      mainTl.to(circle, {
        scale: scale,
        duration: 0.4,
      }, 0.3)
    })

    mainTl.to(boxCenterHighlight, {
      opacity: 1,
      duration: 1,
    }, 0)

    mainTl.to(boxLeftHighlight, {
      opacity: 1,
      duration: 1,
    }, '>')

    mainTl.to(boxRightHighlight, {
      opacity: 1,
      duration: 1,
    }, '>-=0.5')

    mainTl.to(icon, {
      y: () => window.innerHeight - (iconHeight * 5),
      duration: mainTl.duration(),
    }, 0)
  }, {
    dependencies: [stepThreeRef]
  });
};

