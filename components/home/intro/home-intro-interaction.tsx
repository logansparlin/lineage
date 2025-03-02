import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HomeIntroInteractionProps {
  scene: any;
  viewport: any;
  aspectRatio: number;
}

export const HomeIntroInteraction = ({ scene, viewport, aspectRatio }: HomeIntroInteractionProps) => {
  useGSAP(() => {
    const Y_OFFSET = 20;
    const TITLE_DURATION = 0.55;
    const TITLE_EASE = 'power2.inOut';
    const TITLE_END_TIME = `>-=${TITLE_DURATION}`;
    
    ScrollTrigger.normalizeScroll(true)

    const introMesh = scene?.children?.find((child) => child.name === "intro-mesh");

    if (!introMesh) return;

    const topPlanes = introMesh.children.filter((child) => child.name.startsWith("top-step-"));
    const bottomPlanes = introMesh.children.filter((child) => child.name.startsWith("bottom-step-"));
    
    const defaultTitles = document.querySelectorAll('.intro-title-default');
    const firstTitle = document.querySelector('.intro-title-first');
    const secondTitle = document.querySelector('.intro-title-second');
    const lastTitle = document.querySelector('.intro-title-last');

    const defaultSections = document.querySelectorAll('.intro-section-default');
    const firstSection = document.querySelector('.intro-section-first');
    const secondSection = document.querySelector('.intro-section-second');
    const lastSection = document.querySelector('.intro-section-last');
    const exitSection = document.querySelector('.intro-section-exit');

    const description = document.querySelector('.home-intro-description');

    gsap.set(secondTitle, { opacity: 0, y: Y_OFFSET })
    gsap.set(lastTitle, { opacity: 0, y: Y_OFFSET })

    /** Main Timeline */
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home-intro-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    /** Default Section Timeline */
    let defaultSectionTls = [];
    if (defaultTitles?.length) {
      gsap.set(defaultTitles, { opacity: 0, y: Y_OFFSET })
      defaultSectionTls = Array.from(defaultSections).map((section, index) => {
        const title = defaultTitles[index];
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
          }
        })
  
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: TITLE_DURATION,
          ease: TITLE_EASE
        }, 0)
  
        tl.to(title, {
          opacity: 0,
          y: -1 * Y_OFFSET,
          duration: TITLE_DURATION,
          ease: TITLE_EASE,
          delay: 1,
        }, TITLE_END_TIME)
  
        return tl;
      })
    }

    /** First Section Timeline */
    const firstSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: firstSection,
        start: 'top top',
        end: 'bottom top',
      }
    })
  
    topPlanes?.forEach((plane, index) => {
      firstSectionTl.add(
        firstSectionTl.to(plane.scale, {
          x: 0.3,
          y: 0.3,
          z: 0.3,
          duration: 2,
          ease: 'none'
        }, 0)
      )
    })
  
    topPlanes?.reverse().forEach((plane, index) => {
      if (index === 0) return;
  
      const scale = 0.3 + (index * (0.7 / (topPlanes.length - 1)));
  
      firstSectionTl.add(
        firstSectionTl.to(plane.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 1,
          ease: 'none'
        }, index === 1 ? '>' : `<+=${(index - 1) * 0.025}`)
      )
    })

    firstSectionTl.to(firstTitle, {
      opacity: 0,
      y: -1 * Y_OFFSET,
      duration: TITLE_DURATION,
      ease: TITLE_EASE
    }, TITLE_END_TIME)
    
    /** Second Section Timeline */
    const secondSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: secondSection,
        start: 'top top',
        end: 'bottom top',
      }
    })

    secondSectionTl.to(secondTitle, {
      opacity: 1,
      y: 0,
      duration: TITLE_DURATION,
      ease: TITLE_EASE
    }, 0)
  
    topPlanes?.forEach((plane, index) => {
      let scale = 0.3 + (index * (0.7 / (topPlanes.length - 1)));
  
      secondSectionTl.to(plane.scale, {
        x: scale + 0.7,
        y: scale + 0.7,
        z: scale + 0.7,
        duration: 2,
        ease: 'none'
      }, 0)
    })

    secondSectionTl.to(secondTitle, {
      opacity: 0,
      y: -1 * Y_OFFSET,
      duration: TITLE_DURATION,
      ease: TITLE_EASE
    }, TITLE_END_TIME)

    /** Last Section Timeline */
    const factor = 62.42449535909375;
  
    const lastSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: lastSection,
        start: 'top top',
        end: 'bottom top',
      }
    })

    lastSectionTl.to(lastTitle, {
      opacity: 1,
      y: 0,
      duration: TITLE_DURATION,
      ease: TITLE_EASE
    }, 0)

    lastSectionTl.to(description, {
      height: 'auto',
      duration: 2,
      ease: 'none'
    }, '>')

    
    lastSectionTl.to(topPlanes[0]?.position, {
      y: (((viewport.height * aspectRatio) - viewport.height) / 2),
      duration: lastSectionTl.duration() / 2,
      ease: 'none'
    }, 0)
    
    lastSectionTl.set({}, {}, '+=1.5')

    /** Exit Timeline */
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: exitSection,
        start: 'top bottom',
        end: 'bottom top',
      }
    })

    exitTl.to(topPlanes[0]?.position, {
      y: (((viewport.height * aspectRatio) - viewport.height) / 2) + (viewport.height),
      duration: 0.4,
      ease: 'none'
    }, 0.45)

    //  (viewport.height - (viewport.height * (100 / window.innerHeight)))

    bottomPlanes?.forEach((plane, index) => {
      if (!plane.material?.uniforms?.curveProgress) return;
      
      exitTl.add(
        exitTl.to(plane.position, {
          y: plane.position.y + ((window.innerHeight / factor) * 1.55),
          duration: 2,
          ease: 'none'
        }, 0)
      )

      exitTl.add(
        exitTl.to(plane.material.uniforms.curveProgress, {
          value: (index * 1.75),
          duration: 1,
          ease: 'none',
        }, 0.25)
      )
    })

    ScrollTrigger.refresh();

    defaultSectionTls.length && mainTl.add(defaultSectionTls, 0)
    
    mainTl.add(firstSectionTl, 0)
    mainTl.add(secondSectionTl, 0)
    mainTl.add(lastSectionTl, 0)
    mainTl.add(exitTl, 0)
  }, {
    scope: '#home-intro',
    dependencies: [scene]
  })

  return null;
}