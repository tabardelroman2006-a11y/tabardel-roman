/* Photos en relief : chaque photo est accompagnee d'une carte de profondeur
   (blanc = proche, noir = loin). Le shader decale chaque pixel selon sa
   profondeur, ce qui donne l'illusion de la 3D a partir d'une simple image
   (meme astuce que l'intro de persepolis.getty.edu).
   Au passage d'une scene a l'autre, la suivante arrive de la droite et son
   premier plan entre avant le fond. */

export type ReliefImage = { src: string; depth: string; focus: [number, number]; fitX?: number }

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uColA;
uniform sampler2D uDepA;
uniform sampler2D uColB;
uniform sampler2D uDepB;
uniform float uAspA;
uniform float uAspB;
uniform vec2 uFocA;
uniform vec2 uFocB;
uniform float uFitA;
uniform float uFitB;
uniform float uScreen;
uniform float uT;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uDir;

vec2 cover(vec2 uv, float imgAsp, vec2 focus, float zoom) {
  vec2 span = uScreen > imgAsp ? vec2(1.0, imgAsp / uScreen) : vec2(uScreen / imgAsp, 1.0);
  span /= zoom;
  vec2 c = clamp(focus, span * 0.5, 1.0 - span * 0.5);
  return c + (uv - 0.5) * span;
}

vec2 relief(sampler2D dep, vec2 p, vec2 offset) {
  vec2 q = p;
  for (int i = 0; i < 5; i++) {
    float d = texture2D(dep, q).r;
    q = p - offset * (d - 0.4);
  }
  return q;
}

vec3 blurred(sampler2D col, vec2 p) {
  vec3 c = vec3(0.0);
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      c += texture2D(col, clamp(p + vec2(float(x), float(y)) * 0.035, 0.001, 0.999)).rgb;
    }
  }
  return c / 9.0;
}

/* rgb + profondeur. Les photos verticales (fitX > 0) sont posees en entier
   a droite, bords fondus, sur un fond flou tire de la meme photo. */
vec4 scene(sampler2D col, sampler2D dep, vec2 uv, float asp, vec2 focus, float zoom, vec2 offset, float fitX) {
  if (fitX <= 0.0 || uScreen < asp * 1.25) {
    vec2 p = relief(dep, cover(uv, asp, focus, zoom), offset);
    return vec4(texture2D(col, clamp(p, 0.001, 0.999)).rgb, texture2D(dep, p).r);
  }
  vec2 size = vec2(0.96 * asp / uScreen, 0.96);
  vec2 local = (uv - vec2(fitX, 0.52)) / size;
  local = 0.5 + local / (1.0 + (zoom - 1.06) * 0.6);
  vec2 p = relief(dep, local, offset * 0.6);
  float inside = smoothstep(0.0, 0.3, local.x) * smoothstep(1.0, 0.7, local.x)
               * smoothstep(-0.02, 0.12, local.y) * smoothstep(1.02, 0.88, local.y);
  vec3 fg = texture2D(col, clamp(p, 0.001, 0.999)).rgb;
  vec3 bg = blurred(col, vec2(0.04 + uv.x * 0.18, 0.04 + uv.y * 0.26) + offset * 0.2) * 0.92;
  return vec4(mix(bg, fg, inside), mix(0.15, texture2D(dep, p).r, inside));
}

void main() {
  vec2 uv = vUv;
  uv.y = 1.0 - uv.y;
  float breathe = 0.018 * sin(uTime * 0.22);
  vec2 hover = uMouse * vec2(0.018, 0.012);

  /* uDir = cote d'ou arrive la scene suivante (1,0 droite ; -1,0 gauche ;
     0,1 bas ; 0,-1 haut). La scene qui part recule dans l'autre sens. */
  vec2 uvA = uv + uDir * uT * 0.38;
  vec3 colA = scene(uColA, uDepA, uvA, uAspA, uFocA, 1.06 + 0.07 * uT + breathe, hover - uDir * uT * 0.07, uFitA).rgb;
  colA *= 1.0 - 0.45 * uT;

  vec3 col = colA;
  if (uT > 0.0005) {
    vec2 uvB = uv - uDir * (1.0 - uT);
    float lead = (1.0 - uT) * 0.16;
    vec4 b = scene(uColB, uDepB, uvB, uAspB, uFocB, 1.06 + 0.05 * (1.0 - uT) + breathe, hover - uDir * lead, uFitB);
    float edge = dot(uvB, max(uDir, 0.0)) + dot(1.0 - uvB, max(-uDir, 0.0));
    float front = edge + lead * (b.a - 0.4);
    float m = smoothstep(-0.002, 0.004, front);
    float shade = exp(-max(0.0, -front) * 14.0) * 0.5 * (1.0 - m) * smoothstep(0.0, 0.08, uT);
    col = mix(colA * (1.0 - shade), b.rgb, m);
  }

  float g = fract(sin(dot(vUv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}`

type Tex = { color: WebGLTexture; depth: WebGLTexture; aspect: number; focus: [number, number]; fitX: number }

export class ReliefRenderer {
  private gl: WebGLRenderingContext
  private program: WebGLProgram
  private buffer: WebGLBuffer
  private textures: Tex[] = []
  private u: Record<string, WebGLUniformLocation | null> = {}
  private mouse = [0, 0]
  private mouseTarget = [0, 0]
  private pixelRatio: number

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) throw new Error('WebGL indisponible')
    this.gl = gl
    this.pixelRatio = Math.min(window.devicePixelRatio, 1.5)

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
      return s
    }
    const p = gl.createProgram()!
    gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'program')
    this.program = p
    gl.useProgram(p)

    this.buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(p, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    for (const name of ['uColA', 'uDepA', 'uColB', 'uDepB', 'uAspA', 'uAspB', 'uFocA', 'uFocB', 'uFitA', 'uFitB', 'uScreen', 'uT', 'uMouse', 'uTime', 'uDir']) {
      this.u[name] = gl.getUniformLocation(p, name)
    }
    gl.uniform1i(this.u.uColA, 0)
    gl.uniform1i(this.u.uDepA, 1)
    gl.uniform1i(this.u.uColB, 2)
    gl.uniform1i(this.u.uDepB, 3)
  }

  private upload(img: HTMLImageElement) {
    const gl = this.gl
    const t = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
    return t
  }

  async load(images: ReliefImage[], onProgress: (ratio: number) => void) {
    let done = 0
    const total = images.length * 2
    const fetchImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          done++
          onProgress(done / total)
          resolve(img)
        }
        img.onerror = reject
        img.src = src
      })
    const pairs = await Promise.all(images.map(i => Promise.all([fetchImg(i.src), fetchImg(i.depth)])))
    this.textures = pairs.map(([c, d], i) => ({
      color: this.upload(c),
      depth: this.upload(d),
      aspect: c.naturalWidth / c.naturalHeight,
      focus: images[i].focus,
      fitX: images[i].fitX ?? 0,
    }))
  }

  get ready() {
    return this.textures.length > 0
  }

  setMouse(x: number, y: number) {
    this.mouseTarget = [x, y]
  }

  lowerQuality() {
    if (this.pixelRatio <= 0.75) return
    this.pixelRatio = Math.max(0.75, this.pixelRatio - 0.35)
    this.resize()
  }

  resize() {
    const w = Math.round(this.canvas.clientWidth * this.pixelRatio)
    const h = Math.round(this.canvas.clientHeight * this.pixelRatio)
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
    }
    this.gl.viewport(0, 0, w, h)
  }

  render(x: number, time: number, dir: [number, number] = [1, 0]) {
    if (!this.ready) return
    const gl = this.gl
    const n = this.textures.length
    const clamped = Math.min(Math.max(x, 0), n - 1)
    const i = Math.min(Math.floor(clamped), n - 1)
    const t = clamped - i
    const a = this.textures[i]
    const b = this.textures[Math.min(i + 1, n - 1)]

    this.mouse[0] += (this.mouseTarget[0] - this.mouse[0]) * 0.06
    this.mouse[1] += (this.mouseTarget[1] - this.mouse[1]) * 0.06

    const bind = (unit: number, tex: WebGLTexture) => {
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
    }
    bind(0, a.color)
    bind(1, a.depth)
    bind(2, b.color)
    bind(3, b.depth)
    gl.uniform1f(this.u.uAspA, a.aspect)
    gl.uniform1f(this.u.uAspB, b.aspect)
    gl.uniform2f(this.u.uFocA, a.focus[0], a.focus[1])
    gl.uniform2f(this.u.uFocB, b.focus[0], b.focus[1])
    gl.uniform1f(this.u.uFitA, a.fitX)
    gl.uniform1f(this.u.uFitB, b.fitX)
    gl.uniform1f(this.u.uScreen, this.canvas.width / this.canvas.height)
    gl.uniform1f(this.u.uT, t)
    gl.uniform2f(this.u.uMouse, this.mouse[0], this.mouse[1])
    gl.uniform1f(this.u.uTime, time)
    gl.uniform2f(this.u.uDir, dir[0], dir[1])
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  dispose() {
    const gl = this.gl
    for (const t of this.textures) {
      gl.deleteTexture(t.color)
      gl.deleteTexture(t.depth)
    }
    gl.deleteBuffer(this.buffer)
    gl.deleteProgram(this.program)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
