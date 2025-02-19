import { gsap } from "gsap";

const getFirstTimeline = (container: any, planes: any[]) => {
  const title = container?.querySelector('.section-title');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: '200px',
      end: 'bottom top',
      scrub: true,
    }
  })

  planes?.forEach((plane, index) => {
    tl.fromTo(plane.scale, {
      x: 0,
      y: 0,
      z: 0
    }, {
      x: 0.3,
      y: 0.3,
      z: 0.3,
      duration: 1.5,
      ease: 'power3.out'
    }, `<`)
  })

  planes?.reverse().forEach((plane, index) => {
    if (index === 0) return;

    const scale = 0.3 + (index * (0.7 / (planes.length - 1)));

    tl.fromTo(plane.scale, {
      x: 0,
      y: 0,
      z: 0
    }, {
      x: scale,
      y: scale,
      z: scale,
      duration: 1,
      ease: 'power3.out'
    }, index === 1 ? '>' : `<+=${index * 0.01}`)
  })

  tl.fromTo(title, {
    opacity: 1,
  }, {
    opacity: 0,
    duration: .15,
    ease: 'power3.out'
  }, '>')

  tl.scrollTrigger.refresh()

  return tl;
}

const getSecondTimeline = (container: any, planes: any[]) => {
  const title = container?.querySelector('.section-title');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
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

  // tl.fromTo(title, {
  //   opacity: 0,
  // }, {
  //   opacity: 1,
  //   duration: .15,
  //   ease: 'power3.out'
  // })

  // tl.fromTo(title, {
  //   opacity: 1,
  // }, {
  //   opacity: 0,
  //   duration: .15,
  //   delay: 3,
  //   ease: 'power3.out'
  // })

  // tl.scrollTrigger.refresh()

  gsap.set(title, { opacity: 0, y: 10 })

  return tl;
}

export const getIntroTimeline = ({
  variant,
  container,
  planes
}: {
  variant: 'first' | 'second' | 'last' | 'default',
  container: any,
  planes: any[]
}) => {
  if (variant === 'first') return getFirstTimeline(container, planes);
  if (variant === 'second') return getSecondTimeline(container, planes);
}