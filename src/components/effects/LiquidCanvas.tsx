'use client'

import { useEffect, useRef } from 'react'
import type { ShaderMaterial } from 'three'
import { lerp } from '@/lib/utils'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 dist = uv - uMouse;
  float d = length(dist);
  float wave = sin(d * 20.0 - uTime * 2.0) * uIntensity;
  vec2 dir = d > 0.001 ? normalize(dist) : vec2(0.0);
  float distortion = 1.0 - smoothstep(0.0, 0.45, d);

  /* Halo blanc lumineux centré sur la souris */
  float halo = exp(-d * 8.0) * uIntensity * 6.0;
  float ripple = abs(wave) * distortion;

  float alpha = clamp(halo + ripple * 0.4, 0.0, 0.22);
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
`

export function LiquidCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const container = canvasRef.current
    if (!container) return

    let renderer: import('three').WebGLRenderer
    let scene: import('three').Scene
    let camera: import('three').OrthographicCamera
    let mesh: import('three').Mesh
    let rafId: number
    let time = 0
    let mouseX = 0.5
    let mouseY = 0.5
    let targetIntensity = 0
    let currentIntensity = 0
    let isMoving = false
    let moveTimeout: ReturnType<typeof setTimeout>

    async function init() {
      const cont = canvasRef.current
      if (!cont) return

      const THREE = await import('three')

      const w = window.innerWidth
      const h = window.innerHeight

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.inset = '0'
      cont.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1

      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uIntensity: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      })

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      function animate() {
        rafId = requestAnimationFrame(animate)
        time += 0.016

        if (!isMoving) {
          targetIntensity = lerp(targetIntensity, 0, 0.02)
        }
        currentIntensity = lerp(currentIntensity, targetIntensity, 0.05)

        const mat = mesh.material as ShaderMaterial
        mat.uniforms.uTime.value = time
        mat.uniforms.uMouse.value.set(mouseX, mouseY)
        mat.uniforms.uIntensity.value = currentIntensity

        renderer.render(scene, camera)
      }
      animate()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = 1 - e.clientY / window.innerHeight
      targetIntensity = 0.08
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        isMoving = false
        targetIntensity = 0
      }, 150)
    }

    const onResize = () => {
      if (!renderer) return
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    init()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(moveTimeout)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (renderer) {
        renderer.dispose()
        renderer.domElement.remove()
      }
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: 'transparent' }}
    />
  )
}
