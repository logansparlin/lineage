import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

const Y_OFFSET = 14;
const TITLE_EASE = 'elastic.out(1, 0.99)';
const TITLE_DURATION = 0.95;

export const useTitlesAnimation = ({ container, sections }) => {
  useGSAP(() => {
    if (!container.current) return;

    const sectionEls = sections.map(section => container.current.querySelector(section));

    sectionEls.forEach((section, index) => {
      const className = sections[index];
      const titleClass = className.replace('intro-section-', 'intro-title-');
      const title = container.current.querySelector(titleClass);

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: () => (index === sections.length - 1) ? 'bottom top' : 'bottom bottom+=150px',
          onEnter: () => {
            gsap.fromTo(title, {
              autoAlpha: 0,
              y: Y_OFFSET
            }, {
              autoAlpha: 1,
              y: 0,
              duration: () => (index === 0 && window.scrollY < window.innerHeight / 2) ? 0 : TITLE_DURATION,
              ease: TITLE_EASE,
            })
          },
          onEnterBack: () => {
            gsap.fromTo(title, {
              autoAlpha: 0,
              y: -1 * Y_OFFSET
            }, {
              autoAlpha: 1,
              y: 0,
              duration: () => (index === 0 && window.scrollY < window.innerHeight / 2) ? 0 : TITLE_DURATION,
              ease: TITLE_EASE,
            })
          },
          onLeave: () => {
            gsap.to(title, {
              autoAlpha: 0,
              y: -1 * Y_OFFSET,
              duration: TITLE_DURATION,
              ease: TITLE_EASE,
            })
          },
          onLeaveBack: () => {
            gsap.to(title, {
              autoAlpha: 0,
              y: Y_OFFSET,
              duration: TITLE_DURATION,
              ease: TITLE_EASE,
            })
          },
        }
      })
    })
    
    ScrollTrigger.refresh();
  }, {
    scope: container.current,
  })
}