'use client';

import { type FC, type ComponentProps, useRef } from "react";
import { View } from "@react-three/drei";

import { CurvedPlane } from '@/components/home/intro/curved-plane'
import { useFrame } from "@react-three/fiber";

interface CurvedPlaneBackgroundProps extends ComponentProps<'div'> {
  inner: string;
  outer: string;
}

export const CurvedPlaneBackground: FC<CurvedPlaneBackgroundProps> = (props) => {
  const { inner, outer, ...rest } = props;

  return (
    <View {...rest}>
      <BackgroundPlane inner={inner} outer={outer} />
    </View>
  )
}

const BackgroundPlane = ({ inner, outer }) => {
  const meshRef = useRef<any>(null);

  useFrame(({ viewport }) => {
    if (!meshRef.current) return;

    const size = viewport.getCurrentViewport();

    meshRef.current.scale.set(size.width, size.height, 1);
    meshRef.current.position.set(0, 0, 1)
  })

  console.log(inner, outer)

  return (
    <CurvedPlane
      width={1}
      height={1}
      ref={meshRef}
      curveIntensity={3}
      inner={inner}
      outer={outer}
      inset={0.85}
    />
  )
}