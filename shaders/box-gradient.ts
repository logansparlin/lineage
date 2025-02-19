'use client';

import { shaderMaterial } from "@react-three/drei";
import { Color, Vector2 } from "three";

export const BoxGradient = shaderMaterial(
  {
    colorOne: new Color("#000000"),
    colorTwo: new Color("#FFFFFF"),
    size: new Vector2(1, 1),
    scale: 1.0,
    aspect: 1.0,
    curveProgress: 0.0,
    curveIntensity: 4.0
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
  uniform vec2 size;
  uniform float scale;
  uniform float aspect;
  uniform vec3 colorOne;
  uniform vec3 colorTwo;
  varying vec2 vUv;
  varying vec4 vPosition;

  float smoothBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + r;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    // Use vUv instead of normalized position coordinates
    // Center and scale UVs to match our desired coordinate space
    vec2 centeredUV = (vUv - 0.5) * 2.0;
    
    // Create inset coordinates (10% from each edge)
    vec2 inset = centeredUV / 0.85;
    
    float roundness = 0.35;

    vec2 size = vec2(1.0, 1.0);
    
    // Use UV-based coordinates for the SDF
    float sdf = smoothBox(inset, size, roundness);
    
    // Adjust the smoothstep values to control the blur amount
    float normalizedStep = 0.4;
    float alpha = smoothstep(-normalizedStep, normalizedStep, sdf);
    alpha = smoothstep(0.0, 1.0, alpha);
    
    gl_FragColor = vec4(mix(colorTwo, colorOne, alpha), 1.0);
  }
  `
)