'use client';

import { shaderMaterial } from "@react-three/drei";
import { Texture, Color, Vector2 } from "three";

export const TrailShader = shaderMaterial(
  {
    colorOne: new Color('#000000'),
    colorTwo: new Color('#000000'),
    colorThree: new Color('#000000'),
    colorFour: new Color('#000000'),
    map: new Texture(),
    resolution: new Vector2(1, 1),
    amount: 0.65,
    time: 0.0
  },
  // Vertex Shader
  `
    uniform sampler2D map;
    uniform float amount;
    varying vec2 vUv;

    varying float vDisplace;
    void main() {
      float displace = texture2D(map, uv).r;
      vDisplace = displace;

      vec3 pos = position;
      pos.z += displace * 0.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

      vUv = uv;
    }
  `,
  // Fragment Shader
  `
    uniform vec3 colorOne;
    uniform vec3 colorTwo;
    uniform vec3 colorThree;
    uniform vec3 colorFour;
    uniform float time;
    uniform vec2 resolution;

    varying vec2 vUv;
    varying float vDisplace;

    #define PI 3.14159265358979323846

    void main() {
      vec2 uv = vUv / 10.0;

      float trailPosition = uv.y;
      float animatedPosition = fract(trailPosition + time);
      
      vec3 mixedColorOne = mix(colorOne, colorTwo, sin(animatedPosition * PI));
      vec3 mixedColorTwo = mix(colorTwo, colorThree, sin(animatedPosition * PI));
      vec3 mixedColorThree = mix(colorThree, colorFour, sin(animatedPosition * PI));
      
      vec3 col = mix(mixedColorOne, mixedColorTwo, uv.x);
      col = mix(col, mixedColorThree, uv.x);

      vec3 lightColor = vec3(1.0, 1.0, 1.0);
      
      float smoothAlpha = smoothstep(0.0, 1.0, vDisplace);

      vec3 finalColor = col * 1.0 + (2.0 * (vDisplace - 1.2)) + 1.0;
      
      gl_FragColor.rgba = vec4(finalColor, smoothAlpha - 0.75);
    }
  `
)