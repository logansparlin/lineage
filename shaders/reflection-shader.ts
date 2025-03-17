'use client';

import { shaderMaterial } from "@react-three/drei";
import { Texture, Vector2 } from "three";

export const ReflectionShader = shaderMaterial(
  {
    resolution: new Vector2(),
    aspectRatio: 1.0,
    imagePosition: new Vector2(0, 0),
    map: new Texture(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec2 resolution;
    uniform float aspectRatio;
    uniform vec2 imagePosition;
    uniform sampler2D map;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      vec4 color = texture2D(map, uv);      
      uv = imagePosition + .5 + (uv - .5) / resolution;
      
      // Output the final color
      gl_FragColor = color;
    }
  `
)