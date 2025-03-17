'use client'

import { useThree, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei'
import { useLayoutEffect, useRef, useState } from 'react';

export const PerspectiveImage = ({ url, slug, aspectRatio, index }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0 })
  const { viewport } = useThree();
  const imageRef = useRef<any>(null)

  useFrame(({ viewport }) => {
    const container = document.getElementById(`case-image-${slug}`)
    if (!container || !imageRef.current) return;

    const bounds = container.getBoundingClientRect();

    const planeHeight = bounds.height / viewport.factor;
    const planeWidth = planeHeight * 1.65;
    const viewportHeight = viewport.height;
    const screenHeight = window.innerHeight;
    
    const screenCenterY = screenHeight / 2;
    const elementCenterY = bounds.top + bounds.height / 2;
    const offsetFromCenter = screenCenterY - elementCenterY;
    const planeTop = (offsetFromCenter / viewport.factor) - (6 / viewport.factor);

    imageRef.current.position.set(0, planeTop, 0);
    // imageRef.current.scale.set(planeWidth, planeHeight, 1)
    // meshRef.current.material.uniforms.aspectRatio.value = aspectRatio
    // meshRef.current.material.uniforms.size.value.set(planeWidth, planeHeight)
  })

  useLayoutEffect(() => {
    const container = document.getElementById(`case-image-${slug}`)
    if (!container) return;

    const updateDimensions = () => {
      if (!container) return;
      
      const bounds = container.getBoundingClientRect();

      const planeHeight = bounds.height / viewport.factor;
      const planeWidth = planeHeight * 1.65;

      const planeTop = (container.clientTop / viewport.factor);
      
      setDimensions({ width: planeWidth, height: planeHeight, top: planeTop });
    };

    updateDimensions();
    
    window.addEventListener('resize', updateDimensions);
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, [viewport]);

  return (
    <group position={[0, dimensions.top, 0]}>
      <Image ref={imageRef} url={url} scale={[dimensions.width, dimensions.height]} radius={0.25} transparent />
    </group>
  )
}