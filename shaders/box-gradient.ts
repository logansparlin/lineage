'use client';

import { shaderMaterial } from "@react-three/drei";
import { Color, Vector2 } from "three";

export const BoxGradient = shaderMaterial(
  {
    innerColor: new Color("#000000"),
    outerColor: new Color("#ffffff"),
    centerColor: new Color('#ffffff'),
    innerColorNext: new Color("#000000"),
    outerColorNext: new Color("#000000"),
    size: new Vector2(1, 1),
    scale: 1.0,
    aspect: 1.0,
    curveProgress: 0.0,
    curveIntensity: 4.0,
    inset: 0.85,
    colorProgress: 0.0,
  },
  // Vertex Shader
  `
    uniform vec2 size;
    uniform float aspect;
    uniform float curveProgress;
    uniform float curveIntensity;
    varying vec2 vUv; 
    varying vec4 vPosition;

    void main() {
      vUv = uv;
      
      // Calculate curve
      float distanceFromCenter = abs(position.x) / (size.x / 2.0);
      float curve = pow(distanceFromCenter, 2.0) * curveIntensity;
      
      // Apply curve to position
      vec3 adjusted = position;
      adjusted.y *= aspect;
      adjusted.y -= curve * curveProgress;
      
      vec4 pos = projectionMatrix * modelViewMatrix * vec4(adjusted, 1.0);
      vPosition = pos;
      
      gl_Position = pos;
    }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  varying vec4 vPosition;
  
  uniform vec2 size;
  uniform float inset;
  uniform float scale;
  uniform float aspect;
  uniform vec3 innerColor;
  uniform vec3 outerColor;
  uniform vec3 centerColor;
  uniform vec3 innerColorNext;
  uniform vec3 outerColorNext;
  uniform float colorProgress;

  float smoothBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + r;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    // Use vUv instead of normalized position coordinates
    // Center and scale UVs to match our desired coordinate space
    vec2 centeredUV = (vUv - 0.5) * 2.0;
    
    // Create inset coordinates (10% from each edge)
    vec2 sdfInset = centeredUV / inset;
    
    float roundness = 0.35;

    vec2 size = vec2(1.0, 1.0);
    
    // Use UV-based coordinates for the SDF
    float sdf = smoothBox(sdfInset, size, roundness);

    vec2 innerSize = size * 0.75;
    float innerSdf = smoothBox(sdfInset, innerSize, roundness);
    
    // Adjust the smoothstep values to control the blur amount
    float normalizedStep = 0.4;

    float normalizedInnerStep = 0.25;

    if (inset >= 0.9) {
      normalizedStep = 0.25;
    }

    float alpha = smoothstep(-normalizedStep, normalizedStep, sdf);
    float innerAlpha = smoothstep(-normalizedInnerStep, normalizedInnerStep, innerSdf);
    alpha = smoothstep(0.0, 1.0, alpha);
    innerAlpha = smoothstep(0.0, 1.0, innerAlpha);

    vec3 finalColor = mix(outerColor, innerColor, alpha);
    vec3 finalColorNext = mix(outerColorNext, innerColorNext, alpha);

    if (centerColor.r < 0.99) {
      finalColor = mix(centerColor, finalColor, innerAlpha);
    }

    if (colorProgress > 0.0) {
      if (centerColor.r < 0.99) {
        finalColor = mix(centerColor, mix(finalColor, finalColorNext, colorProgress), innerAlpha);
      } else {
       finalColor = mix(finalColor, finalColorNext, colorProgress);
      }
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
  `
)