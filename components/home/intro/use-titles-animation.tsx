import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

const Y_OFFSET = 10;
const TITLE_EASE = 'power2.inOut';

export const useTitlesAnimation = ({ container, sections }) => {
  useGSAP(() => {
    if (!container.current) return;

    const sectionEls = sections.map(section => container.current.querySelector(section));

    sectionEls.forEach((section, index) => {
      const className = sections[index];
      const titleClass = className.replace('intro-section-', 'intro-title-');
      const title = container.current.querySelector(titleClass);

      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: () => index === sections.length - 1 ? 'bottom top-=150%' : 'bottom top',
        }
      })

      sectionTl.to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 0.15,
        ease: TITLE_EASE,
      }, 0)

      sectionTl.to({}, {}, '+=0.5')

      sectionTl.to(title, {
        autoAlpha: 0,
        y: -1 * Y_OFFSET,
        duration: 0.15,
        ease: TITLE_EASE,
      }, '<')
      
    })
    
    ScrollTrigger.refresh();
  }, {
    scope: container.current,
  })
}