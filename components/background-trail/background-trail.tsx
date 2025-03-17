'use client'

import { type FC, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface BackgroundTrailProps {
  colors: string[]
}

export const BackgroundTrail: FC<BackgroundTrailProps> = ({
  colors = ['rgba(251, 197, 4, 1)', 'rgba(0, 191, 87, 1)', 'rgba(255, 126, 197, 1)']
}) => {
  const trailContainerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const mouseSpeed = useRef(0)
  const isMouseMoving = useRef(false)
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const transitionProgressRef = useRef(0)
  const opacityRef = useRef(0)
  
  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const clockRef = useRef<THREE.Clock | null>(null)
  
  // Trail positions for particles
  const trailPositions = useRef<Array<{
    x: number, 
    y: number, 
    age: number, 
    size: number,
    colorRatio: number,
    mesh: THREE.Mesh | null
  }>>([])

  // Parse color to THREE.Color
  const parseColor = (color: string): THREE.Color => {
    // Check if it's rgba format
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (rgbaMatch) {
      return new THREE.Color(
        parseInt(rgbaMatch[1], 10) / 255,
        parseInt(rgbaMatch[2], 10) / 255,
        parseInt(rgbaMatch[3], 10) / 255
      )
    }
    
    // Use THREE.js color parsing for hex
    return new THREE.Color(color)
  }

  // Interpolate between colors
  const interpolateColor = (ratio: number): THREE.Color => {
    if (colors.length === 0) return new THREE.Color(0x000000)
    
    if (colors.length === 1) return parseColor(colors[0])
    
    // Map ratio to the color array index
    const scaledRatio = ratio * (colors.length - 1)
    const index = Math.floor(scaledRatio)
    const nextIndex = Math.min(index + 1, colors.length - 1)
    const colorRatio = scaledRatio - index
    
    // Parse the two colors to interpolate between
    const color1 = parseColor(colors[index])
    const color2 = parseColor(colors[nextIndex])
    
    // Apply a power function to make colors more vibrant
    // This reduces the whiteness in the center by making the transition less linear
    const adjustedRatio = Math.pow(colorRatio, 1.5)
    
    // THREE.Color has built-in lerp method
    return color1.clone().lerp(color2, adjustedRatio)
  }

  useEffect(() => {
    if (!trailContainerRef.current) return

    // Initialize Three.js
    const container = trailContainerRef.current
    const width = window.innerWidth
    const height = window.innerHeight
    
    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Create orthographic camera (2D view)
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, 
      height / 2, height / -2, 
      0.1, 1000
    )
    camera.position.z = 10
    cameraRef.current = camera
    
    // Create renderer with alpha
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer
    
    // Create clock for animation timing
    const clock = new THREE.Clock()
    clockRef.current = clock
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Update camera
      const camera = cameraRef.current
      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
      camera.updateProjectionMatrix()
      
      // Update renderer
      rendererRef.current.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Create a reusable particle material with custom shader for better blur
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        opacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          // Create a soft circular gradient for each particle
          float distance = length(vUv - vec2(0.5));
          float alpha = smoothstep(0.1, 0.0, distance) * opacity;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    })
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse coordinates to Three.js coordinate system
      const x = e.clientX - width / 2
      const y = -(e.clientY - height / 2)
      
      // Calculate mouse speed
      const dx = x - lastMousePosition.current.x
      const dy = y - lastMousePosition.current.y
      mouseSpeed.current = Math.sqrt(dx * dx + dy * dy)
      
      lastMousePosition.current = { x, y }
      mousePosition.current = { x, y }
      
      // Calculate unique color ratio for this point
      const colorRatio = (Math.sin(transitionProgressRef.current + (x * 0.0001)) + 1) / 2
      
      // Add position to trail with dynamic threshold based on speed
      const threshold = 1
      
      if (trailPositions.current.length === 0 || 
          Math.abs(trailPositions.current[0].x - x) > threshold || 
          Math.abs(trailPositions.current[0].y - y) > threshold) {
        
        // Size variation based on mouse speed
        const size = 500
        
        // Create a plane geometry for the particle
        const geometry = new THREE.PlaneGeometry(size * 2, size * 2, 24, 24)
        
        // Clone the material and set its color
        const material = particleMaterial.clone()
        const color = interpolateColor(colorRatio)
        material.uniforms.color.value = color
        
        // Create mesh and add to scene
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, 0)
        scene.add(mesh)
        
        trailPositions.current.unshift({ 
          x, 
          y, 
          age: 0,
          size,
          colorRatio,
          mesh
        })
        
        // Keep trail at reasonable length
        if (trailPositions.current.length > 60) {
          const oldest = trailPositions.current.pop()
          if (oldest?.mesh) {
            scene.remove(oldest.mesh)
            if (oldest.mesh.geometry) {
              (oldest.mesh.geometry as THREE.BufferGeometry).dispose()
            }
            if (oldest.mesh.material) {
              (oldest.mesh.material as THREE.Material).dispose()
            }
          }
        }
      }
      
      // Handle visibility
      if (!isMouseMoving.current) {
        isMouseMoving.current = true
        opacityRef.current = 1
        
        if (fadeTimerRef.current) {
          clearTimeout(fadeTimerRef.current)
          fadeTimerRef.current = null
        }
      }
      
      // Reset timeout
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current)
      }
      
      mouseTimerRef.current = setTimeout(() => {
        isMouseMoving.current = false
        
        // Set a delayed fade out
        fadeTimerRef.current = setTimeout(() => {
          // Will be picked up by animation loop
        }, 500)
      }, 300)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !clockRef.current) return
      
      const delta = clockRef.current.getDelta()
      
      // Update color transition (complete cycle in 5 seconds)
      transitionProgressRef.current += (delta / 5) * Math.PI
      
      // Handle fade out when mouse stops
      if (!isMouseMoving.current && opacityRef.current > 0) {
        opacityRef.current -= 0.025
        if (opacityRef.current < 0) opacityRef.current = 0
      }
      
      // Update trail positions and remove those with zero opacity
      trailPositions.current = trailPositions.current.filter(pos => {
        pos.age += delta
        
        if (pos.mesh) {
          // Size decreases along the trail and with age
          const sizeMultiplier = 1
          const size = pos.size * Math.max(0.1, sizeMultiplier)
          
          // Scale the mesh
          pos.mesh.scale.set(sizeMultiplier, sizeMultiplier, 1)
          
          // Alpha decreases with age and position in trail
          const index = trailPositions.current.indexOf(pos)
          const alpha = (1 - (pos.age / 3)) * opacityRef.current * (1 - (index / (trailPositions.current.length * 1.5)))
          
          // Update material opacity
          const material = pos.mesh.material as THREE.ShaderMaterial
          material.uniforms.opacity.value = alpha
          
          // If opacity is zero, remove the mesh and don't keep in array
          if (alpha <= 0) {
            if (sceneRef.current) {
              sceneRef.current.remove(pos.mesh)
              if (pos.mesh.geometry) {
                (pos.mesh.geometry as THREE.BufferGeometry).dispose()
              }
              if (pos.mesh.material) {
                (pos.mesh.material as THREE.Material).dispose()
              }
            }
            return false
          }
        }
        
        return true
      })
      
      // Remove old positions
      const oldPositions = trailPositions.current.filter(pos => pos.age >= 3)
      oldPositions.forEach(pos => {
        if (pos.mesh && sceneRef.current) {
          sceneRef.current.remove(pos.mesh)
          if (pos.mesh.geometry) {
            (pos.mesh.geometry as THREE.BufferGeometry).dispose()
          }
          if (pos.mesh.material) {
            (pos.mesh.material as THREE.Material).dispose()
          }
          pos.mesh = null
        }
      })
      trailPositions.current = trailPositions.current.filter(pos => pos.age < 3)
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      
      requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
      
      // Clean up Three.js resources
      trailPositions.current.forEach(pos => {
        if (pos.mesh) {
          if (pos.mesh.geometry) {
            pos.mesh.geometry.dispose()
          }
          if (pos.mesh.material) {
            (pos.mesh.material as THREE.Material).dispose()
          }
        }
      })
      
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [colors])

  return (
    <div 
      ref={trailContainerRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 opacity-40"
    />
  )
}
