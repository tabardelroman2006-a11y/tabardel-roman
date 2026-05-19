'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const VERT = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

/* Rendu de ripples lumineux sur fond noir.
   mix-blend-mode: screen → le noir est transparent, la lumière s'additionne à la photo */
const FRAG = `
  precision highp float;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uTime;
  uniform float uIntensity;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec2 mouse = uMouse / uResolution;
    mouse.y = 1.0 - mouse.y;

    float dist = distance(uv, mouse);

    float wave1 = sin(dist * 28.0 - uTime * 2.6) * exp(-dist * 4.2) * uIntensity;
    float wave2 = sin(dist * 18.0 - uTime * 2.0) * exp(-dist * 5.5) * uIntensity * 0.55;
    float wave3 = cos(dist * 34.0 - uTime * 3.2) * exp(-dist * 6.5) * uIntensity * 0.3;

    float ripple   = wave1 + wave2 + wave3;
    float glow     = max(0.0, ripple) * 0.65;
    float halo     = exp(-dist * 9.0) * uIntensity * 0.35;
    float luminance = glow + halo;

    /* Légère teinte bleutée */
    vec3 col = vec3(luminance * 0.82, luminance * 0.91, luminance);

    gl_FragColor = vec4(col, 1.0);
  }
`

export function LiquidHero({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const intRef    = useRef({ value: 0, target: 0 })
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null
    if (!gl) return

    const compileShader = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compileShader(VERT, gl.VERTEX_SHADER))
    gl.attachShader(program, compileShader(FRAG, gl.FRAGMENT_SHADER))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 2)
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const start = Date.now()

    const render = () => {
      const t = (Date.now() - start) / 1000
      const m = mouseRef.current
      const i = intRef.current

      m.x += (m.targetX - m.x) * 0.06
      m.y += (m.targetY - m.y) * 0.06
      i.value += (i.target - i.value) * 0.04

      gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), canvas.width, canvas.height)
      gl.uniform2f(
        gl.getUniformLocation(program, 'uMouse'),
        m.x * (canvas.width  / canvas.offsetWidth),
        m.y * (canvas.height / canvas.offsetHeight)
      )
      gl.uniform1f(gl.getUniformLocation(program, 'uTime'),      t)
      gl.uniform1f(gl.getUniformLocation(program, 'uIntensity'), i.value)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animRef.current = requestAnimationFrame(render)
    }
    render()

    const parent = canvas.parentElement!
    const m = mouseRef.current
    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      m.targetX = e.clientX - r.left
      m.targetY = e.clientY - r.top
      intRef.current.target = 1.0
    }
    const onLeave = () => { intRef.current.target = 0 }
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        const r = canvas.getBoundingClientRect()
        mouseRef.current.targetX = e.touches[0].clientX - r.left
        mouseRef.current.targetY = e.touches[0].clientY - r.top
        intRef.current.target = 0.6
      }
    }

    parent.addEventListener('mousemove',  onMove)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('touchmove',  onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      parent.removeEventListener('mousemove',  onMove)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('touchmove',  onTouch)
    }
  }, [])

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        minHeight: 600,
        backgroundImage: "url('/images/bg-photo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Overlay sombre pour lisibilité du texte */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}
      />

      {/* Canvas WebGL — ripple au curseur (screen blend : le noir disparaît, la lumière s'additionne) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block', opacity: 0.55, mixBlendMode: 'screen' }}
      />

      {/* Contenu */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}
