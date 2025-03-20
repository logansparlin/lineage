import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Decal } from "@react-three/drei";

import { ImageShader } from "@/shaders/image-shader";
import { MathUtils, DoubleSide, Vector2, LinearFilter } from "three";
import { useIsomorphicLayoutEffect } from "react-use";

interface CaseStudiesScrollItemProps {
  url: string;
  width: number;
  height: number;
  container: HTMLElement;
  index?: number;
  img: HTMLImageElement;
  zPosition?: number;
  startOffset?: number;
  gradientDirection?: 'up' | 'down';
}

export const CaseStudiesScrollItem = memo(({
  url,
  width,
  height,
  img,
  index,
  container,
  zPosition = 0,
  startOffset = 0,
  gradientDirection,
}: CaseStudiesScrollItemProps) => {
  const meshRef = useRef<any>(null);
  const pointerPosition = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });

  const texture = useTexture(img?.currentSrc ?? url, (tex) => {
    if (tex && meshRef.current) {
      tex.magFilter = tex.minFilter = LinearFilter
      tex.needsUpdate = true;
      meshRef.current.material.uniforms.map.value = tex;
    }
  });

  // useIsomorphicLayoutEffect(() => {
  //   console.log(gradientDirection)
  //   if (typeof window === 'undefined' || gradientDirection) return;

  //   const handlePointerMove = (event: PointerEvent) => {
  //     const x = (event.clientX / window.innerWidth) * 2 - 1;
  //     const y = -((event.clientY / window.innerHeight) * 2 - 1);
      
  //     pointerPosition.current = { x, y };
  //   }

  //   window.addEventListener('pointermove', handlePointerMove)

  //   return () => {
  //     window.removeEventListener('pointermove', handlePointerMove)
  //   }
  // }, [])

  useFrame(({ viewport, camera }) => {
    if (!meshRef.current) return;
    
    const size = viewport.getCurrentViewport();
    const fov = (camera as any).fov ?? 70;
    
    const fovRadians = (fov * Math.PI) / 180;
    const scaleFactor = 2 * Math.tan(fovRadians / 2) * zPosition;
    
    const xUnits = 1 / size.width;
    const yUnits = 1 / size.height;
    const xScale = 1 + (scaleFactor * xUnits);
    const yScale = 1 + (scaleFactor * yUnits);
    const perspectiveScale = Math.max(xScale, yScale);
    const viewAspectRatio = size.width / size.height;
    
    const imgRect = img?.getBoundingClientRect();
    const imgWidthScale = imgRect.width / window.innerWidth;
    const aspectRatio = imgRect.height / imgRect.width;

    const planeWidth = (perspectiveScale * imgWidthScale) * 1.035;
    const planeHeight = planeWidth * aspectRatio * viewAspectRatio * 1.035;

    const pixelRatio = 1 / ((size.height * planeHeight) / perspectiveScale);
    
    const imgCenterY = imgRect.top + imgRect.height / 2 - (window.innerHeight / 2) + (window.innerHeight * startOffset);
    const yPos = -1 * ((imgCenterY / size.factor) * pixelRatio)

    const scrollOffset = (container.getBoundingClientRect().top / size.factor) * pixelRatio;
    
    // meshRef.current.position.set(0, yPos + scrollOffset, 0.01)
    meshRef.current.material.uniforms.imagePosition.value.set(0, -1 * (yPos + scrollOffset));
    meshRef.current.material.uniforms.scale.value.set(planeWidth, planeHeight);
    meshRef.current.material.uniforms.resolution.value.set(size.width * planeWidth, size.height * planeHeight);
    meshRef.current.material.uniforms.imageResolution.value.set(width, height);
    
    meshRef.current.material.needsUpdate = true;

    // const planeBounds = {
    //   left: -planeWidth / 2,
    //   right: planeWidth / 2,
    //   top: -planeHeight / 2,
    //   bottom: planeHeight / 2
    // }

    // const isInBounds = pointerPosition.current.x >= planeBounds.left && pointerPosition.current.x <= planeBounds.right && pointerPosition.current.y >= planeBounds.top && pointerPosition.current.y <= planeBounds.bottom;

    // if (isInBounds) {
    //   pointerTarget.current.x = MathUtils.lerp(pointerTarget.current.x, pointerPosition.current.x, 0.03);
    //   pointerTarget.current.y = MathUtils.lerp(pointerTarget.current.y, pointerPosition.current.y, 0.03);
    // } else {
    //   pointerTarget.current.x = MathUtils.lerp(pointerTarget.current.x, 0, 0.03);
    //   pointerTarget.current.y = MathUtils.lerp(pointerTarget.current.y, 0, 0.03);
    // }

    // meshRef.current.material.uniforms.mouse.value.set(pointerTarget.current.x * 0.25, pointerTarget.current.y * 0.25);
  })

  const resolution = new Vector2(1, 1);
  const imageResolution = new Vector2(1, 1);
  const imagePosition = new Vector2(0, 0);
  const mouse = new Vector2(0, 0);
  const scale = new Vector2(1, 1);

  return (
    <Decal depthTest={true} key={index} ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* @ts-ignore */}
      <primitive
        attach="material"
        object={new ImageShader()}
        map={texture}
        uniforms={{
          imageResolution: { value: imageResolution},
          imagePosition: { value: imagePosition },
          resolution: { value: resolution},
          blurAmount: { value: 0.0 },
          mouse: { value: mouse },
          scale: { value: scale },
          map: texture,
          gradientDirection: { value: !gradientDirection ? 0 : gradientDirection === 'up' ? 1 : -1 }
        }}
        transparent
        polygonOffset
        polygonOffsetFactor={-1}
        toneMapped={false}
        side={DoubleSide}
      />
    </Decal>
  )
})