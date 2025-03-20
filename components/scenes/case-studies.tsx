'use client'

import { memo, Suspense, useEffect, useMemo, useRef, lazy, useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import { useFrame, useThree } from "@react-three/fiber";

import { PlaneGeometry } from "three";
import { CaseStudiesBackground } from "./case-studies-background";
import { CaseStudiesScrollItem } from "./case-studies-scroll-item";

// const CaseStudiesScrollItem = lazy(() => import('./case-studies-scroll-item').then(mod => ({ default: mod.CaseStudiesScrollItem })))

const DEPTH = 5;

export const CaseStudiesScene = memo(({ items }: { items: any[] }) => {
  const { viewport } = useThree();
  
  const backRef = useRef<any>(null);
  const topRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);

  const pointerPosition = useRef({ x: 0, y: 0 });
  const pointerPositionTarget = useRef({ x: 0, y: 0 });

  const planeGeometry = new PlaneGeometry(1, 1);

  const mappedItems = useMemo(() => {
    if (typeof window === 'undefined') return [];
    
    const container = document.getElementById(`case-studies-scroll`)

    return items?.map((item, index) => {
      const el = document.getElementById(`case-study-${index}`)
      const img = el?.querySelector('.case-image-container .case-image')

      return {
        index,
        container,
        width: item.featuredImage?.width,
        height: item.featuredImage?.height,
        img,
        url: urlFor(item.featuredImage).auto('format').width(1200).quality(90).url(),
        ...item
      }
    })
  }, [items])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      
      pointerPosition.current = { x, y };
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

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

  return (
    <Suspense fallback={null}>
      <CaseStudiesBackground />
      <group>
        <mesh ref={backRef} geometry={planeGeometry} position={[0, 0, -1 * (DEPTH / 2)]}>
          <meshBasicMaterial color="black" transparent opacity={0} />
          {mappedItems?.map((item) => {
            return (
              <CaseStudiesScrollItem key={`back-${item._id}`} zPosition={DEPTH / 2} {...item} />
            )
          })}
        </mesh>

        <mesh ref={topRef} geometry={planeGeometry} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="black" transparent opacity={0} />
          {mappedItems?.map((item) => {
            return (
              <CaseStudiesScrollItem
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
                startOffset={-0.8}
                zPosition={DEPTH / 2}
                gradientDirection="up"
                {...item}
              />
            )
          })}
        </mesh>
        {/* <OrbitControls enableZoom={false} /> */}
      </group>
    </Suspense>
  )
})

{/* <mesh
  ref={cubeRef}
  geometry={boxGeometry}
  position={[0, 0, -1.5]}
> 
  <meshStandardMaterial attach="material-1" color="black" opacity={0} transparent side={BackSide} />
  <meshStandardMaterial attach="material-4" color="black" opacity={0} transparent side={BackSide} />
  <meshStandardMaterial attach="material-6" color="black" opacity={0} transparent side={BackSide} />
  

  <meshStandardMaterial attach="material-2" color="black" opacity={0} transparent side={BackSide} />
  <Decal ref={decalTopRef} position={[0, 0.01, -0.01]} rotation={[Math.PI / 2, 0, 0]} scale={[1.0, 1.0, 1]}>

    <imageShader
      map={texture}
      side={BackSide}
      transparent
      polygonOffset
      polygonOffsetFactor={-1}
      toneMapped={false}
    />
  </Decal>
  

  <meshBasicMaterial attach="material-3" color="black" side={BackSide} transparent opacity={0} />
  <Decal ref={decalBottomRef} position={[0, -0.01, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={[1.0, -1.0, 1]}>

    <imageShader
      map={texture}
      side={BackSide}
      transparent
      polygonOffset
      polygonOffsetFactor={-1}
      toneMapped={false}
    />
  </Decal>


  <meshStandardMaterial attach="material-5" color="black" opacity={0} transparent />
  <Decal ref={decalRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
    <meshBasicMaterial transparent toneMapped={false} color="#ffffff" opacity={0.1}>
      <RenderTexture attach="map">
        <group position={[0, 0, 0]}>
          <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position={[0, 0, 1]} />
          <group position={[0, 0, 0]}>
            {mappedItems?.map((item) => {
              return (
                <CaseStudiesScrollItem key={item._id} {...item} />
              )
            })}
          </group>
        </group>
      </RenderTexture>
    </meshBasicMaterial>
  </Decal>
</mesh> */}