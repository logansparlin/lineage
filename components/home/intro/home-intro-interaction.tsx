'use client'

import { useMemo } from "react";
import { useHomeStore } from "../hooks/use-home-store";
import { Color } from "three";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getGradient } from "@/lib/gradients";

interface HomeIntroInteractionProps {
  scene: any;
  viewport: any;
  aspectRatio: number;
}

export const HomeIntroInteraction = ({ scene, viewport, aspectRatio }: HomeIntroInteractionProps) => {
  const setIsColorChanging = useHomeStore((state) => state.setIsColorChanging);
  const nextGradient = useHomeStore((state) => state.nextGradient);

  const nextGradientData = useMemo(() => getGradient(nextGradient), [nextGradient]);

  /** Set Gradient Colors */
  useGSAP(() => {
    const introMesh = scene?.children?.find((child) => child.name === "intro-mesh");

    if (!nextGradientData || !introMesh) return;

    setIsColorChanging(true);

    introMesh.children?.forEach((child) => {
      if (child.name.includes('exit-plane')) return;

      if (child.name.includes('bottom')) {
        child.material.uniforms.innerColorNext.value = new Color(nextGradientData.outer).convertLinearToSRGB();
        child.material.uniforms.outerColorNext.value = new Color(nextGradientData.inner).convertLinearToSRGB();
      } else {
        child.material.uniforms.innerColorNext.value = new Color(nextGradientData.outer).convertLinearToSRGB();
        child.material.uniforms.outerColorNext.value = new Color(nextGradientData.inner).convertLinearToSRGB();
      }

      gsap.to(child.material.uniforms.colorProgress, {
        value: 1,
        duration: 0.75,
        ease: 'power4.out',
        onComplete: () => {
          setIsColorChanging(false);
          gsap.set(child.material.uniforms.colorProgress, { value: 0 })
          if (child.name.includes('bottom')) {
            gsap.set(child.material.uniforms.outerColor, { value: new Color(nextGradientData.inner).convertLinearToSRGB() })
            gsap.set(child.material.uniforms.innerColor, { value: new Color(nextGradientData.outer).convertLinearToSRGB() })
          } else {
            gsap.set(child.material.uniforms.outerColor, { value: new Color(nextGradientData.inner).convertLinearToSRGB() })
            gsap.set(child.material.uniforms.innerColor, { value: new Color(nextGradientData.outer).convertLinearToSRGB() })
          }
        }
      })
    })
  }, {
    dependencies: [nextGradientData]
  })
  
  /** Scrolling Animation */
  useGSAP(() => {
    const Y_OFFSET = 20;
    const TITLE_DURATION = 0.55;
    const TITLE_EASE = 'power2.inOut';
    const TITLE_END_TIME = `>-=${TITLE_DURATION}`;
    const normalizedSize = Math.max(viewport.width, viewport.height);
    
    ScrollTrigger.normalizeScroll(true)

    const introMesh = scene?.children?.find((child) => child.name === "intro-mesh");

    if (!introMesh) return;

    const topPlanes = introMesh.children.filter((child) => child.name.startsWith("top-step-"));
    const bottomPlanes = introMesh.children.filter((child) => child.name.startsWith("bottom-step-"));
    const exitPlanes = introMesh.children.filter((child) => child.name.startsWith("exit-plane-"));
    
    const defaultTitles = document.querySelectorAll('.intro-title-default');
    const firstTitle = document.querySelector('.intro-title-first');
    const secondTitle = document.querySelector('.intro-title-second');
    const lastTitle = document.querySelector('.intro-title-last');

    const defaultSections = document.querySelectorAll('.intro-section-default');
    const firstSection = document.querySelector('.intro-section-first');
    const secondSection = document.querySelector('.intro-section-second');
    const lastSection = document.querySelector('.intro-section-last');
    const exitSection = document.querySelector('.intro-section-exit');
    const caseEnterSection = document.querySelector('.case-enter-section');
    const description = document.querySelector('.home-intro-description');

    console.log(exitPlanes?.[0]?.position)

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
    const factor = 62.42449535909375;
  
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
    
    lastSectionTl.to(topPlanes[0]?.position, {
      y: getBottomPosition(),
      duration: lastSectionTl.duration() / 2,
      ease: 'none'
    }, 0)

    /** Exit Timeline */
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: exitSection,
        start: 'top bottom',
        end: 'bottom top-=300%',
      }
    })

    exitTl.to(topPlanes[0]?.position, {
      y: getBottomPosition(normalizedSize * 1.5),
      duration: 1,
      ease: 'none'
    }, 0)

    bottomPlanes?.forEach((plane, index) => {
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
        start: 'top bottom+=100%',
        end: 'top bottom',
      }
    })

    exitPlanes?.forEach((plane, index) => {
      preEnterTl.add(
        preEnterTl.to(plane.position, {
          z: () => plane.position.z + 1,
          duration: 1,
          ease: 'none'
        }, 0)
      )
    })

    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: caseEnterSection,
        start: 'top bottom',
        end: 'bottom top',
      }
    })

    exitPlanes?.forEach((plane) => {
      if (!plane.material?.uniforms?.curveProgress) return;
      
      enterTl.add(
        enterTl.to(plane.position, {
          y: () => plane.position.y + (normalizedSize * 1.25),
          duration: 1,
          ease: 'none'
        }, 0)
      )

      enterTl.add(
        enterTl.to(plane.material.uniforms.curveProgress, {
          value: () => 0,
          duration: 1,
          ease: 'none',
        }, 0)
      )
    })

    ScrollTrigger.refresh();

    defaultSectionTls?.length && mainTl.add(defaultSectionTls, 0)
    
    mainTl.add(firstSectionTl, 0)
    mainTl.add(secondSectionTl, 0)
    mainTl.add(lastSectionTl, 0)
    mainTl.add(exitTl, 0)
    mainTl.add(preEnterTl, 0)
    mainTl.add(enterTl, 0)
  }, {
    scope: '#home-intro',
    dependencies: [scene]
  })

  return null;
}