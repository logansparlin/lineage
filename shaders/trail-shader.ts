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
    uniform vec2 resolution;
    varying vec2 vUv;

    vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.411764705882353) * direction;
      vec2 off2 = vec2(3.2941176470588234) * direction;
      vec2 off3 = vec2(5.176470588235294) * direction;
      color += texture2D(image, uv) * 0.1964825501511404;
      color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
      color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
      color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
      color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
      color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
      color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
      return color;
    }

    varying float vDisplace;
    void main() {
      float displace = blur(map, uv, resolution * 10.0, vec2(0.15, 0.25)).r;
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
      vec2 uv = vUv / 4.0;

      float trailPosition = uv.y;
      float animatedPosition = fract(trailPosition + time * 0.25);
      
      vec3 mixedColorOne = mix(colorOne, colorTwo, sin(animatedPosition * PI));
      vec3 mixedColorTwo = mix(colorTwo, colorThree, sin(animatedPosition * PI));
      vec3 mixedColorThree = mix(colorThree, colorFour, sin(animatedPosition * PI));
      
      vec3 col = mix(mixedColorOne, mixedColorTwo, uv.x);
      col = mix(col, mixedColorThree, uv.x);

      vec3 lightColor = vec3(0.97, 0.97, 0.97);
      vec3 black = vec3(0.0, 0.0, 0.0);
      
      float smoothAlpha = smoothstep(0.25, 0.9, vDisplace);

      vec3 finalColor = col + (2.5 * (vDisplace - 1.5)) + 0.5;

      finalColor = mix(black, (col + (finalColor * 0.75)), vDisplace);
      
      gl_FragColor.rgba = vec4(finalColor, 0.75);
    }
  `
)