'use client';

import { shaderMaterial } from "@react-three/drei";
import { Color, Vector2 } from "three";

export const BlurShader = shaderMaterial(
  {
    resolution: new Vector2(),
    bgColor: new Color('#000000'),
    fgColor: new Color('#000000'),
    radius: 1,
    strength: 1,
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
    uniform vec3 bgColor;
    uniform vec3 fgColor;
    uniform vec3 resolution;
    uniform float radius;
    uniform float strength;
    varying vec2 vUv;

    // Signed distance function for a triangle defined by 3 points
    float dot2( in vec2 v ) { return dot(v,v); }
    float sdTriangle( in vec2 p, in vec2 p0, in vec2 p1, in vec2 p2 )
    {
      vec2 e0=p1-p0, v0=p-p0; float d0=dot2(v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.0,1.0));
      vec2 e1=p2-p1, v1=p-p1; float d1=dot2(v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.0,1.0));
      vec2 e2=p0-p2, v2=p-p2; float d2=dot2(v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.0,1.0));
        
        float o = e0.x*e2.y-e0.y*e2.x;
        vec2 d = min(min(vec2(d0,o*(v0.x*e0.y-v0.y*e0.x)),
                        vec2(d1,o*(v1.x*e1.y-v1.y*e1.x))),
                        vec2(d2,o*(v2.x*e2.y-v2.y*e2.x)));
      return -sqrt(d.x)*sign(d.y);
    }

    void main() {
      // Normalize coordinates to center
      vec2 uv = vUv * 2.0 - 1.0;

      uv *= 1.1;
      
      // Adjust aspect ratio
      float aspectRatio = resolution.x / resolution.y;
      uv.x *= aspectRatio;
      
      // Top Triangle
      vec2 p0_top = vec2(-aspectRatio, -1.25);
      vec2 p1_top = vec2(aspectRatio, -1.25);
      vec2 p2_top = vec2(0.0, -0.1);
      
      // Bottom Triangle
      vec2 p0_bottom = vec2(-aspectRatio, 1.25);
      vec2 p1_bottom = vec2(aspectRatio, 1.25);
      vec2 p2_bottom = vec2(0.0, 0.1);
      
      // Calculate distance to triangles
      float upperTriangle = sdTriangle(uv, p0_top, p1_top, p2_top);
      float lowerTriangle = sdTriangle(uv, p0_bottom, p1_bottom, p2_bottom);
      
      // Combine triangles to form hourglass
      float k = 0.325; // Adjust this value to control smoothness
      float h = max(k - abs(upperTriangle - lowerTriangle), 0.0) / k;
      float hourglass = min(upperTriangle, lowerTriangle) - h * h * h * k * (1.0/6.0);
      
      // Apply opacity-based blur effect
      float blurWidth = radius * strength;
      float edgeDistance = abs(hourglass);
      
      // Create a gradient that mixes between foreground and background colors
      float mixFactor = 1.0;
      if (hourglass > 0.0) {
        // Outside the shape - calculate mix factor based on distance
        mixFactor = max(0.0, 1.0 - edgeDistance / blurWidth);
        mixFactor = smoothstep(0.0, 1.0, mixFactor);
      }
      
      // Apply cutoff for performance
      if (mixFactor < 0.01) {
        gl_FragColor = vec4(bgColor, 1.0);
      } else {
        // Mix between background and foreground colors
        vec3 finalColor = mix(bgColor, fgColor, mixFactor);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    }
  `
)