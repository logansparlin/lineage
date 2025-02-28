import { gsap } from "gsap";

const getFirstTimeline = (container: any, planes: any[]) => {
  const title = container?.querySelector('.section-title');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: '100px',
      end: 'bottom top',
      onEnterBack: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.65, ease: 'power4.out' })
      },
      onLeave: () => {
        gsap.to(title, { opacity: 0, y: -6, duration: 0.65, ease: 'power4.out' })
      },
      
    }
  })

  planes?.forEach((plane, index) => {
    tl.add(
      tl.to(plane.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 2,
        ease: 'none'
      }, 0)
    )
  })

  planes?.reverse().forEach((plane, index) => {
    if (index === 0) return;

    const scale = 0.3 + (index * (0.7 / (planes.length - 1)));

    tl.add(
      tl.to(plane.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1,
        ease: 'none'
      }, index === 1 ? '>' : `<+=${(index - 1) * 0.025}`)
    )
  })

  // tl.scrollTrigger.refresh()

  return tl;
}

const getSecondTimeline = (container: any, planes: any[]) => {
  const title = container?.querySelector('.section-title');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.65, ease: 'power4.out' })
      },
      onEnterBack: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.65, ease: 'power4.out' })
      },
      onLeave: () => {
        gsap.to(title, { opacity: 0, y: -6, duration: 0.65, ease: 'power4.out' })
      },
      onLeaveBack: () => {
        gsap.to(title, { opacity: 0, y: 6, duration: 0.65, ease: 'power4.out' })
      }
    }
  })

  planes?.reverse().forEach((plane, index) => {
    let scale = 0.3 + (index * (0.7 / (planes.length - 1)));

    tl.to(plane.scale, {
      x: scale + 0.7,
      y: scale + 0.7,
      z: scale + 0.7,
      duration: 2,
      ease: 'none'
    }, 0)
  })

  gsap.set(title, { opacity: 0, y: 10 })

  return tl;
}

const getLastTimeline = (container: any, planes: any[], bottomPlanes: any[]) => {
  const title = container?.querySelector('.section-title');
  const factor = 62.42449535909375;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.65, ease: 'power4.out' })
      },
      onEnterBack: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.65, ease: 'power4.out' })
      },
      onLeave: () => {
        gsap.to(title, { opacity: 0, y: -6, duration: 0.65, ease: 'power4.out' })
      },
      onLeaveBack: () => {
        gsap.to(title, { opacity: 0, y: 6, duration: 0.65, ease: 'power4.out' })
      }
    }
  })

  bottomPlanes?.forEach((plane, index) => {
    if (!plane.material?.uniforms?.curveProgress) return;
    
    tl.add(
      tl.to(plane.position, {
        y: plane.position.y + ((window.innerHeight / factor) * 1.75),
        duration: 2,
        ease: 'none'
      }, `<`)
    )

    tl.add(
      tl.to(plane.material.uniforms.curveProgress, {
        value: (index * 1),
        duration: 1.5
      }, `<+=${index * 0.01}`)
    )
  })

  gsap.set(title, { opacity: 0, y: 10 })

  return tl;
}

export const getIntroTimeline = ({
  variant,
  container,
  planes,
  bottomPlanes,
}: {
  variant: 'first' | 'second' | 'last' | 'default',
  container: any,
  planes: any[],
  bottomPlanes: any[],
}) => {
  if (variant === 'first') return getFirstTimeline(container, planes);
  if (variant === 'second') return getSecondTimeline(container, planes);
  if (variant === 'last') return getLastTimeline(container, planes, bottomPlanes);
}