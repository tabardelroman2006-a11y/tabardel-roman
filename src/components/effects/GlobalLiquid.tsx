'use client'

import { useEffect, useRef } from 'react'
import type { ShaderMaterial, Texture } from 'three'
import { lerp } from '@/lib/utils'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float     uTime;
uniform vec2      uMouse;
uniform float     uIntensity;
uniform float     uScreenAspect;
uniform float     uImageAspect;
varying vec2      vUv;

/* object-fit: cover */
vec2 coverUv(vec2 uv) {
  float r = uScreenAspect / uImageAspect;
  if (r > 1.0) uv.y = (uv.y - 0.5) * r + 0.5;
  else         uv.x = (uv.x - 0.5) / r + 0.5;
  return uv;
}

void main() {
  vec2 uv    = vUv;
  vec2 mouse = vec2(uMouse.x, 1.0 - uMouse.y);

  vec2  toMouse = uv - mouse;
  float d       = length(toMouse);
  vec2  dir     = d > 0.001 ? normalize(toMouse) : vec2(0.0);

  /* Zone fluide autour du curseur — falloff smooth */
  float zone    = smoothstep(0.45, 0.0, d);
  float falloff = zone * uIntensity;

  /* Vague principale — ondulation radiale */
  float wave = sin(d * 14.0 - uTime * 3.5) * falloff * 0.018;
  uv += dir * wave;

  /* Deuxième couche — turbulence croisée pour effet liquide */
  vec2 perp = vec2(-dir.y, dir.x);
  float turb = sin(d * 8.0 - uTime * 2.0 + 1.5) * falloff * 0.008;
  uv += perp * turb;

  /* Respiration ambiante très subtile — image reste lisible */
  uv.x += sin(vUv.y * 3.5 + uTime * 0.18) * 0.0018;
  uv.y += cos(vUv.x * 3.0 + uTime * 0.14) * 0.0015;

  /* Rendu */
  vec2 texUv = coverUv(clamp(uv, 0.001, 0.999));
  gl_FragColor = texture2D(uTexture, texUv);
}
`

export function GlobalLiquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let renderer: import('three').WebGLRenderer
    let scene:    import('three').Scene
    let camera:   import('three').OrthographicCamera
    let mesh:     import('three').Mesh
    let rafId:    number
    let time = 0
    let mouseX = 0.5
    let mouseY = 0.5
    let targetIntensity  = 0
    let currentIntensity = 0
    let isMoving = false
    let moveTimeout: ReturnType<typeof setTimeout>

    async function init() {
      const canvas = canvasRef.current
      if (!canvas) return
      const THREE = await import('three')

      const w = window.innerWidth
      const h = window.innerHeight

      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      scene  = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1

      /* Chargement de la texture */
      const texture = await new Promise<Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(
          '/images/hero-photo.jpg',
          (t) => { t.minFilter = THREE.LinearFilter; resolve(t) },
          undefined,
          reject
        )
      })

      const img = texture.image as { width: number; height: number }
      const imageAspect = img.width / img.height

      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture:      { value: texture },
          uTime:         { value: 0 },
          uMouse:        { value: new THREE.Vector2(0.5, 0.5) },
          uIntensity:    { value: 0 },
          uScreenAspect: { value: w / h },
          uImageAspect:  { value: imageAspect },
        },
      })

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      function animate() {
        rafId = requestAnimationFrame(animate)
        time += 0.016

        if (!isMoving) targetIntensity = lerp(targetIntensity, 0, 0.025)
        currentIntensity = lerp(currentIntensity, targetIntensity, 0.06)

        const mat = mesh.material as ShaderMaterial
        mat.uniforms.uTime.value      = time
        mat.uniforms.uMouse.value.set(mouseX, mouseY)
        mat.uniforms.uIntensity.value = currentIntensity

        renderer.render(scene, camera)
      }
      animate()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
      targetIntensity = 1.0
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        isMoving = false
        targetIntensity = 0
      }, 200)
    }

    const onResize = () => {
      if (!renderer || !mesh) return
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      ;(mesh.material as ShaderMaterial).uniforms.uScreenAspect.value = w / h
    }

    init()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize',    onResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(moveTimeout)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
      renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        0,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  )
}
