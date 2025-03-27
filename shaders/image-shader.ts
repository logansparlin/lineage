'use client';

import { shaderMaterial } from "@react-three/drei";
import { Color, Texture, Vector2 } from "three";

export const ImageShader = shaderMaterial(
  {
    imageResolution: new Vector2(1, 1),
    imagePosition: new Vector2(0, 0),
    resolution: new Vector2(1, 1),
    scale: new Vector2(1, 1),
    mouse: new Vector2(0, 0),
    map: new Texture(),
    blurAmount: 0.0,
    gradientDirection: 0.0,
    shadowColor: new Color('#000000'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec2 baseUv;
    uniform vec2 imagePosition;
    uniform vec2 resolution;
    uniform vec2 scale;
    uniform vec2 mouse;
    
    // Function to calculate distortion based on mouse position
    vec3 distortPosition(vec3 position, vec2 uv, vec2 mousePos) {
      // Since mousePos is already in -1 to 1 range, we need to match our position space
      vec2 positionXY = position.xy;

      positionXY /= scale;
      
      // Calculate distance from current position to mouse position
      // Scale the distance calculation based on the scale uniform to match the UV scaling
      float distanceToMouse = length(positionXY - mousePos);
      
      // Create a stronger distortion effect
      float distortionStrength = 0.025;
      float falloff = exp(-distanceToMouse * 0.15); // Reduced falloff rate for wider effect
      
      // Apply distortion in the direction away from mouse
      vec2 direction = normalize(positionXY - mousePos);
      
      // Apply distortion directly to the position, but scale it inversely to the scale uniform
      // This ensures the distortion effect is proportional to the scaled UV space
      position.xy += direction * falloff * distortionStrength;
      
      return position;
    }

    void main() {
      baseUv = uv;
      vUv = imagePosition + 0.5 + (uv - 0.5) / scale;
      // vec3 distortedPosition = distortPosition(position, vUv, mouse);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    precision highp float;

    uniform vec2 imageResolution;
    uniform vec2 resolution;
    uniform float blurAmount;
    uniform vec2 imagePosition;
    uniform float gradientDirection;
    uniform sampler2D map;
    uniform vec2 mouse;
    uniform vec3 shadowColor;

    varying vec2 vUv;
    varying vec2 baseUv;

    float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
      return length(max(abs(CenterPosition)-Size+Radius,0.0))-Radius;
    }

    float getAspectRatio(vec2 resolution) {
      return resolution.x / resolution.y;
    }

    vec2 mirrored(vec2 v) {
      vec2 m = mod(v,2.);
      return mix(m,2.0 - m, step(1.0 ,m));
    }

    vec3 draw(sampler2D image, vec2 uv) {
      return texture2D(image,vec2(uv.x, uv.y)).rgb;   
    }

    float rand(vec2 co){
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    vec3 blur(vec2 uv, sampler2D image, vec2 direction, vec2 resolution) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.3846153846) * direction;
      vec2 off2 = vec2(3.2307692308) * direction;
      color += texture2D(image, uv) * 0.2270270270;
      color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
      color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
      color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
      color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
      return color.rgb;
    }

    float getDistance(vec2 a, vec2 b) {
      return sqrt(pow(a.x - b.x, 2.0) + pow(a.y - b.y, 2.0));
    }

    vec2 fitImage(vec2 uv, vec2 resolution, vec2 imageResolution) {
      vec2 intUv = uv;

      vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
        min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
      );

      vec2 imageUv = vec2(
        intUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        intUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      return imageUv;
    }

    void main() {
      vec2 uv = vUv;
      
      vec2 imageUv = fitImage(vUv, resolution, imageResolution);

      float aspectRatio = getAspectRatio(resolution);
      float imageAspectRatio = getAspectRatio(imageResolution);

      float scale = aspectRatio / imageAspectRatio;

      vec2 centered = (vUv - 0.5) * resolution;
      
      float edgeSoftness = 0.01;
      float radius = 0.45;
      
      float distance = roundedBoxSDF(centered, resolution * 0.5 - radius, radius);
      
      float smoothedAlpha = 1.0 - smoothstep(-edgeSoftness, 0.0, distance);

      vec4 color = texture2D(map, imageUv);

      vec3 blurredColor = blur(imageUv, map, vec2(0.1, 0.1), resolution);
      
      float gradientOpacity = 1.0;
      
      if (gradientDirection != 0.0) {
        float gradientValue = gradientDirection > 0.0 ? baseUv.y : (1.0 - baseUv.y);
        
        gradientOpacity = smoothstep(0.5, 1.0, gradientValue);

        color.rgb = mix(color.rgb, blurredColor, gradientOpacity);
      }
      
      color.a *= gradientOpacity;

      vec4 finalColor = vec4(color.rgb, color.a * smoothedAlpha);

      if (shadowColor != vec3(0.0)) {
        vec3 glowColor = shadowColor;
        float glowStrength = 0.65;
        float glowSize = 4.5;
        
        float glowFactor = smoothstep(glowSize, 0.0, abs(distance));
        
        float outsideShape = 1.0 - step(0.0, -distance);
        
        vec3 glowEffect = glowColor * glowStrength * glowFactor * outsideShape;
        
        finalColor.rgb += glowEffect;
        
        float glowAlpha = glowFactor * outsideShape * glowStrength;
        finalColor.a = max(finalColor.a, glowAlpha);

        if (outsideShape > 0.0 && finalColor.a <= glowAlpha) {
          finalColor.rgb = glowColor;
        }
      }
      
      gl_FragColor = finalColor;
    }
  `
)