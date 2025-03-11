'use client'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const HomeIntroInteraction = () => {
  const { viewport, scene } = useThree();
  
  /** Scrolling Animation */
  useGSAP(async () => {
    const Y_OFFSET = 20;
    const TITLE_DURATION = 0.55;
    const TITLE_EASE = 'power2.inOut';
    const TITLE_END_TIME = `>-=${TITLE_DURATION}`;
    const normalizedSize = Math.max(viewport.width, viewport.height);

    await new Promise((resolve) => setTimeout(resolve, 5));
    
    // ScrollTrigger.normalizeScroll(true)

    const introMesh = scene?.children?.find((child) => child.name === "intro-mesh");

    if (!introMesh) return;

    const allPlanes = introMesh.children;
    const topPlanes = introMesh.children.filter((child) => child.name.startsWith("top-step-"));
    const bottomPlanes = introMesh.children.filter((child) => child.name.startsWith("bottom-step-"));
    const exitPlanes = introMesh.children.filter((child) => child.name.startsWith("exit-plane-"));
    
    const defaultTitles = document.querySelectorAll('.intro-title-default');
    const firstTitle = document.querySelector('.intro-title-first');
    const secondTitle = document.querySelector('.intro-title-second');
    const lastTitle = document.querySelector('.intro-title-last');
    const description = document.querySelector('.home-intro-description');

    const footer = document.querySelector('#site-footer');
    const defaultSections = document.querySelectorAll('.intro-section-default');
    const firstSection = document.querySelector('.intro-section-first');
    const secondSection = document.querySelector('.intro-section-second');
    const lastSection = document.querySelector('.intro-section-last');
    const exitSection = document.querySelector('.intro-section-exit');
    const caseEnterSection = document.querySelector('.case-enter-section');

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
          y: () => -1 * Y_OFFSET,
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
          x: () => scale,
          y: () => scale,
          z: () => scale,
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

      secondSectionTl.set(plane.scale, { x: scale, y: scale, z: scale }, 0)
  
      secondSectionTl.to(plane.scale, {
        x: () => scale + 0.7,
        y: () => scale + 0.7,
        z: () => scale + 0.7,
        duration: 2,
        ease: 'none'
      }, 0)
    })

    secondSectionTl.to(secondTitle, {
      opacity: 0,
      y: () => -1 * Y_OFFSET,
      duration: TITLE_DURATION,
      ease: TITLE_EASE
    }, TITLE_END_TIME)

    /** Last Section Timeline */
    const lastSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: lastSection,
        start: 'top top',
        end: 'bottom bottom',
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


    const getBottomPosition = (additionalOffset = 0, scale = 1) => {
      return () => (((normalizedSize * scale) - viewport.height) / 2) + additionalOffset
    }

    topPlanes?.forEach((plane, index) => {
      let scale = (0.3 + (index * (0.7 / (topPlanes.length - 1))) + 0.7);

      lastSectionTl.set(plane.scale, { x: scale, y: scale, z: scale }, 0)

    })
    
    // lastSectionTl.to(topPlanes[0]?.position, {
    //   y: getBottomPosition(),
    //   duration: lastSectionTl.duration() / 2,
    //   ease: 'none'
    // }, 0)

    /** Exit Timeline */
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: exitSection,
        start: 'top bottom',
        end: 'bottom top-=300%',
      }
    })

    bottomPlanes?.forEach((plane: any, index) => {
      if (!plane.material?.uniforms?.curveProgress) return;
      
      exitTl.add(
        exitTl.to(plane.position, {
          y: () => plane.position.y + (normalizedSize * 1.5),
          duration: 1,
          ease: 'none'
        }, 0)
      )

      exitTl.add(
        exitTl.to(plane.material.uniforms.curveProgress, {
          value: () => (index * 1),
          duration: 1,
          ease: 'none',
        }, 0)
      )
    })

    exitTl.to({}, {}, '+=0.5')

    const preEnterTl = gsap.timeline({
      scrollTrigger: {
        trigger: caseEnterSection,
        start: 'top bottom',
        end: 'top bottom',
      }
    })

    allPlanes?.forEach((plane: any) => {
      const name = plane.name;

      if (name.startsWith('exit-plane-')) {
        preEnterTl.add(
          preEnterTl.to(plane.material.uniforms.opacity, {
            value: () => 1,
          }, 0)
        )
      } else {
        preEnterTl.add(
          preEnterTl.to(plane.material.uniforms.opacity, {
            value: () => 0,
          }, 0)
        )
      }
    })

    const caseEnterTl = gsap.timeline({
      scrollTrigger: {
        trigger: caseEnterSection,
        start: 'top bottom',
        end: 'bottom bottom',
      }
    })

    const caseExitTl = gsap.timeline({
      scrollTrigger: {
        trigger: caseEnterSection,
        start: 'bottom bottom',
        end: 'bottom bottom-=100%',
      }
    })

    exitPlanes?.forEach((plane: any, index) => {
      if (!plane.material?.uniforms?.curveProgress) return;

      const yScale = 1.5;
      const size = normalizedSize * yScale;
      const topFull = (viewport.height + ((size - viewport.height) / 2))
      const yPosition = (topFull + (index * (size * 0.125)))
      
      caseEnterTl.add(
        caseEnterTl.to(plane.position, {
          y: () => yPosition - (viewport.height * 1.05),
          duration: 1,
          ease: 'none'
        }, 0)
      )

      caseEnterTl.add(
        caseEnterTl.to(plane.material.uniforms.curveProgress, {
          value: () => 0,
          duration: 1,
          ease: 'none',
        }, 0)
      )

      caseExitTl.add(
        caseExitTl.to(plane.position, {
          y: () => yPosition - (viewport.height * 0.05),
          duration: 1,
          ease: 'none'
        }, 0)
      )
    })

    ScrollTrigger.refresh()
  }, {
    dependencies: [scene]
  })

  return null;
}