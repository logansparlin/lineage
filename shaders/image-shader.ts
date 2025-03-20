'use client';

import { shaderMaterial } from "@react-three/drei";
import { Texture, Vector2 } from "three";

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
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec2 baseUv;
    uniform vec2 imagePosition;
    uniform vec2 resolution;
    uniform vec2 scale;

    void main() {
      baseUv = uv;
      vUv = imagePosition + 0.5 + (uv - 0.5) / scale;
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

    // vec3 blur(vec2 uv, sampler2D image, float blurAmount, vec2 resolution){
    //   vec3 blurredImage = vec3(0.);
    //   float d = 1.0;
    //   #define repeats 40.
    //   for (float i = 0.; i < repeats; i++) { 
    //     vec2 q = vec2(cos(degrees((i / repeats) * 360.)), sin(degrees((i / repeats) * 360.))) * (rand(vec2(i, uv.x + uv.y)) + blurAmount); 
    //     vec2 uv2 = uv + (q * blurAmount * d);
    //     blurredImage += draw(image, uv2) / 2.;
    //     q = vec2(cos(degrees((i / repeats) * 360.)), sin(degrees((i / repeats) * 360.))) * (rand(vec2(i + 2., uv.x + uv.y + 24.)) + blurAmount); 
    //     uv2 = uv + (q * blurAmount * d);
    //     blurredImage += draw(image, uv2) / 2.;
    //   }
    //   return blurredImage / repeats;
    // }

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

      // Normalize coordinates to (0, 0) - use imageUv for centering calculation
      vec2 centered = (vUv - 0.5) * resolution;
      
      float edgeSoftness = 0.01;
      float radius = 0.45;
      
      float distance = roundedBoxSDF(centered, resolution * 0.5 - radius, radius);
      
      float smoothedAlpha = 1.0 - smoothstep(-edgeSoftness, 0.0, distance);

      vec4 color = texture2D(map, imageUv);

      vec3 blurredColor = blur(imageUv, map, vec2(0.1, 0.1), resolution);

      // Create a circular mask around the mouse position
      // vec2 mousePos = vec2(0.5 + mouse.x * 0.5, 0.5 + mouse.y * 0.5); // Convert from [-1,1] to [0,1] range
      // float mouseDist = getDistance(imageUv, mousePos);
      
      // Parameters for the circular focus area
      // float focusRadius = 0.1; // Size of the sharp focus area
      // float transitionWidth = 0.35; // Width of the blur transition
      
      // Create a smooth transition between sharp and blurred image
      // float focusMask = 1.0 - smoothstep(focusRadius, focusRadius + transitionWidth, mouseDist);
      
      // Mix the original color and the blurred color based on the mask
      // blurredColor = mix(blurredColor, color.rgb, focusMask);
      
      // vec4 finalColor = vec4(blurredColor, color.a * smoothedAlpha);
      
      // Apply gradient based on direction
      float gradientOpacity = 1.0;
      
      if (gradientDirection != 0.0) {
        // Create a linear gradient from bottom to top
        float gradientValue = gradientDirection > 0.0 ? baseUv.y : (1.0 - baseUv.y);
        
        // Adjust the gradient to be more pronounced
        gradientOpacity = smoothstep(0.5, 1.0, gradientValue);

        color.rgb = mix(color.rgb, blurredColor, gradientOpacity);
      }
      
      // Combine the gradient opacity with our existing alpha values
      color.a *= gradientOpacity;

      vec4 finalColor = vec4(color.rgb, color.a * smoothedAlpha);
      
      // Output the final color with proper aspect ratio and rounded corners
      gl_FragColor = finalColor;
    }
  `
)