'use client'

import { memo, Suspense, useMemo, useRef, useCallback } from "react";
import { useHomeStore } from "../home/hooks/use-home-store";
import { urlFor } from "@/sanity/lib/image";
import { useFrame } from "@react-three/fiber";
import { useWindowSize } from "react-use";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { Color, PlaneGeometry } from "three";
import { CaseStudiesBackground } from "./case-studies-background";
import { CaseStudiesScrollItem } from "./case-studies-scroll-item";
import { getStepColorsRGB } from "@/lib/get-step-colors";

const DEPTH = 5;

export const CaseStudiesScene = memo(({ items }: { items: any[] }) => {
  const currentStep = useHomeStore(state => state.currentStep)
  const { width } = useWindowSize();

  const groupRef = useRef<any>(null);
  const backRef = useRef<any>(null);
  const topRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);

  const planeGeometry = new PlaneGeometry(1, 1, 1, 1);

  const initialColor = useMemo(() => {
    const gradient = getStepColorsRGB(currentStep)
    return new Color(gradient?.[300]).convertLinearToSRGB()
  }, [])

  useGSAP(() => {
    if (!backRef.current) return;

    const nextGradient = getStepColorsRGB(currentStep)

    const meshes = backRef.current.children;

    meshes?.forEach((mesh) => {
      const uniforms = mesh.material.uniforms as any;

      gsap.to(uniforms.shadowColor.value, {
        r: new Color(nextGradient[300]).convertLinearToSRGB().r,
        g: new Color(nextGradient[300]).convertLinearToSRGB().g,
        b: new Color(nextGradient[300]).convertLinearToSRGB().b,
        duration: 0.75,
        overwrite: true,
        ease: 'linear',
      })
    })
  }, [currentStep])

  const mappedItems = useMemo(() => {
    if (typeof window === 'undefined') return [];
    
    const container = document.getElementById(`case-studies-scroll`)

    return items?.map((item, index) => {
      const el = document.getElementById(`case-study-${index}`)
      const img = el?.querySelector('.case-image-container .case-image')
      const videoAspect = item.featuredVideo?.aspectRatio?.split(':').map(Number).reduce((acc, curr) => acc > 0 ? acc / curr : curr, 0)
      const aspectRatio = item.featuredMediaType === 'video' ? videoAspect : item.featuredImage?.aspectRatio

      return {
        index,
        container,
        width: item.featuredImage?.width,
        height: item.featuredImage?.height,
        mediaType: item.featuredMediaType,
        aspectRatio,
        playbackId: item.featuredVideo?.playbackId,
        img,
        url: urlFor(item.featuredImage).auto('format').width(1200).quality(90).url(),
        ...item
      }
    })
  }, [items])

  const setSizes = useCallback((size: any) => {
    if (!size.height || !size.width) return;

    backRef.current?.scale.set(size.width, size.height, 1);
    topRef.current?.scale.set(size.width, DEPTH, 1);
    bottomRef.current?.scale.set(size.width, DEPTH, 1);

    topRef.current?.position.set(0, size.height / 2, 0);
    bottomRef.current?.position.set(0, -size.height / 2, 0);
  }, [])
  
  useFrame(({ viewport }) => {
    const size = viewport.getCurrentViewport();

    setSizes(size);
  })

  const isMobile = useMemo(() => {
    return width < 800;
  }, [width])

  const blankShadowColor = new Color('#000000')

  return (
    <Suspense fallback={null}>
      <CaseStudiesBackground />
      {!isMobile ? (
        <group ref={groupRef}>
          <mesh ref={backRef} geometry={planeGeometry} position={[0, 0, -1 * (DEPTH / 2)]}>
            <meshBasicMaterial color="black" transparent opacity={0} />
            {mappedItems?.map((item) => {
              return (
                <CaseStudiesScrollItem
                  shadowColor={initialColor}
                  key={`back-${item._id}`}
                  zPosition={DEPTH / 2}
                  isMain
                  {...item}
                />
              )
            })}
          </mesh>

          <mesh ref={topRef} geometry={planeGeometry} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="black" transparent opacity={0} />
            {mappedItems?.map((item) => {
              return (
                <CaseStudiesScrollItem
                  shadowColor={blankShadowColor}
                  key={`top-${item._id}`}
                  startOffset={0.8}
                  zPosition={DEPTH / 2}
                  gradientDirection="down"
                  {...item}
                />
              )
            })}
          </mesh>
          
          <mesh ref={bottomRef} geometry={planeGeometry} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="black" transparent opacity={0} />
            {mappedItems?.map((item) => {
              return (
                <CaseStudiesScrollItem
                  key={`bottom-${item._id}`}
                  shadowColor={blankShadowColor}
                  startOffset={-0.8}
                  zPosition={DEPTH / 2}
                  gradientDirection="up"
                  {...item}
                />
              )
            })}
          </mesh>
        </group>
      ) : null}
    </Suspense>
  )
})
