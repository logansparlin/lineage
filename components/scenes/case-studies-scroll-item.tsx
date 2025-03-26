import { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useVideoTexture, Decal } from "@react-three/drei";

import { ImageShader } from "@/shaders/image-shader";
import { DoubleSide, Vector2, LinearFilter } from "three";

interface CaseStudiesScrollItemProps {
  url: string;
  width: number;
  height: number;
  container: HTMLElement;
  index?: number;
  img: HTMLImageElement;
  playbackId: string;
  mediaType: 'image' | 'video';
  zPosition?: number;
  startOffset?: number;
  gradientDirection?: 'up' | 'down';
}

export const CaseStudiesScrollItem = memo(({
  url,
  width,
  height,
  img,
  playbackId,
  mediaType,
  index,
  container,
  zPosition = 0,
  startOffset = 0,
  gradientDirection,
}: CaseStudiesScrollItemProps) => {
  const meshRef = useRef<any>(null);

  const texture = mediaType === 'video' && playbackId ? 
  useVideoTexture(`https://stream.mux.com/${playbackId}.m3u8`, {
    onVideoFrame: (now, metadata) => {
      if (!meshRef.current || !meshRef.current.material) return;

      meshRef.current.material.uniforms.map.value = texture;
      meshRef.current.material.needsUpdate = true;
    }
  })
  : useTexture(img?.currentSrc ?? url, (tex) => {
    if (!tex || !meshRef.current) return;

    tex.magFilter = tex.minFilter = LinearFilter
    tex.needsUpdate = true;

    meshRef.current.material.uniforms.map.value = tex;
  })

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