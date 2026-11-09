import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RINGS = [
  { radius: 1.9, color: '#67e8f9', spin: [0.34, 0.1, 0], tilt: [1.2, 0.2, 0] },
  { radius: 2.15, color: '#a78bfa', spin: [-0.12, 0.3, 0.08], tilt: [0.3, 1.1, 0.4] },
  { radius: 2.4, color: '#e879f9', spin: [0.1, -0.16, 0.26], tilt: [-0.6, 0.4, 1.0] },
]

const SHARDS = [
  { geometry: 'icosa', position: [2.55, 0.95, -0.6], size: 0.11, color: '#67e8f9', spin: [0.35, 0.22], bob: 0.12, phase: 0.4, speed: 0.7, opacity: 0.3 },
  { geometry: 'octa', position: [-2.7, -0.55, 0.4], size: 0.09, color: '#a78bfa', spin: [-0.28, 0.34], bob: 0.1, phase: 1.8, speed: 0.55, opacity: 0.34 },
  { geometry: 'tetra', position: [2.15, -1.5, 0.8], size: 0.085, color: '#e879f9', spin: [0.4, -0.2], bob: 0.14, phase: 3.1, speed: 0.8, opacity: 0.28 },
  { geometry: 'icosa', position: [-2.2, 1.55, -0.9], size: 0.07, color: '#c4b5fd', spin: [-0.22, -0.3], bob: 0.09, phase: 4.4, speed: 0.62, opacity: 0.3 },
  { geometry: 'octa', position: [2.95, -0.25, -1.2], size: 0.065, color: '#818cf8', spin: [0.26, 0.4], bob: 0.11, phase: 5.2, speed: 0.48, opacity: 0.26 },
  { geometry: 'tetra', position: [-2.95, 0.85, 1.1], size: 0.07, color: '#67e8f9', spin: [-0.36, 0.18], bob: 0.13, phase: 2.3, speed: 0.72, opacity: 0.24 },
]

const NEAR_COLORS = ['#67e8f9', '#a78bfa', '#c4b5fd', '#e879f9']
const FAR_COLORS = ['#a78bfa', '#e879f9', '#818cf8']

const PARTICLE_VERTEX = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uEnergy;
  attribute float aSeed;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    float swirl = uTime * (0.025 + aSeed * 0.02);
    float c = cos(swirl);
    float s = sin(swirl);
    p.xz = mat2(c, -s, s, c) * p.xz;
    p.y += sin(uTime * 0.5 + aSeed * 6.2831) * 0.12;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float twinkle = 0.55 + 0.45 * sin(uTime * (1.2 + aSeed * 1.6) + aSeed * 30.0);
    gl_PointSize = aScale * uPixelRatio * (30.0 / -mv.z) * (0.75 + uEnergy * 0.6) * twinkle;

    vColor = aColor;
    vAlpha = twinkle;
  }
`

const PARTICLE_FRAGMENT = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 2.4) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function Ring({ radius, color, spin, tilt, energy, index }) {
  const group = useRef()
  const torus = useRef()
  const glow = useRef()
  const node = useRef()

  const trail = useMemo(() => (
    Array.from({ length: 7 }, (_, step) => {
      const t = step / 6
      return {
        angle: -t * 0.42,
        size: 0.062 * (1 - t) ** 2 + 0.008,
        opacity: 0.9 * (1 - t) ** 1.6,
      }
    })
  ), [])

  useFrame((state, dt) => {
    const boost = 1 + energy.current * 1.5
    group.current.rotation.x += dt * spin[0] * boost
    group.current.rotation.y += dt * spin[1] * boost
    group.current.rotation.z += dt * spin[2] * boost

    const time = state.clock.elapsedTime
    const pulse = 1 + Math.sin(time * 0.9 + index * 1.7) * 0.012 + energy.current * 0.035
    group.current.scale.setScalar(pulse)

    torus.current.material.opacity = 0.44 + energy.current * 0.3 + Math.sin(time * 1.4 + index) * 0.06
    glow.current.material.opacity = 0.1 + energy.current * 0.12
    node.current.scale.setScalar(1 + energy.current * 0.85 + Math.sin(time * 2.2 + index) * 0.08)
  })

  return (
    <group ref={group} rotation={tilt}>
      <mesh ref={torus}>
        <torusGeometry args={[radius, 0.009, 8, 180]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={glow}>
        <torusGeometry args={[radius, 0.032, 8, 180]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={node} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {trail.map((particle, step) => (
        <mesh
          key={`${color}-trail-${step}`}
          position={[Math.cos(particle.angle) * radius, Math.sin(particle.angle) * radius, 0]}
        >
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={particle.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function Shard({ config, energy }) {
  const ref = useRef()

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime
    ref.current.rotation.x += dt * config.spin[0]
    ref.current.rotation.y += dt * config.spin[1]
    ref.current.position.x = config.position[0] + Math.cos(time * config.speed * 0.7 + config.phase) * config.bob * 0.6
    ref.current.position.y = config.position[1] + Math.sin(time * config.speed + config.phase) * config.bob
    ref.current.material.opacity = config.opacity + energy.current * 0.24
  })

  return (
    <mesh ref={ref} position={config.position}>
      {config.geometry === 'octa' && <octahedronGeometry args={[config.size, 0]} />}
      {config.geometry === 'tetra' && <tetrahedronGeometry args={[config.size, 0]} />}
      {config.geometry === 'icosa' && <icosahedronGeometry args={[config.size, 0]} />}
      <meshBasicMaterial
        color={config.color}
        wireframe
        transparent
        opacity={config.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

function ParticleField({ count, innerRadius, outerRadius, palette, size, speed, energy, seedOffset, rotation }) {
  const ref = useRef()
  const material = useRef()

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const scales = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const swatches = palette.map((hex) => new THREE.Color(hex))

    for (let i = 0; i < count; i += 1) {
      const base = seedOffset + i * 5
      const radius = innerRadius + seededValue(base + 1) * (outerRadius - innerRadius)
      const theta = seededValue(base + 2) * Math.PI * 2
      const phi = Math.acos(2 * seededValue(base + 3) - 1)
      const swatch = swatches[Math.floor(seededValue(base + 4) * swatches.length)]
        .clone()
        .lerp(new THREE.Color('#ffffff'), 0.14)

      positions.set([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ], i * 3)
      seeds[i] = seededValue(base + 5)
      scales[i] = size * (0.4 + seededValue(base + 6) * 1.2)
      colors.set([swatch.r, swatch.g, swatch.b], i * 3)
    }

    return { positions, seeds, scales, colors }
  }, [count, innerRadius, outerRadius, palette, seedOffset, size])

  useFrame((state, dt) => {
    ref.current.rotation.y += dt * speed
    const shader = material.current
    if (!shader) return
    shader.uniforms.uTime.value = state.clock.elapsedTime
    shader.uniforms.uPixelRatio.value = state.gl.getPixelRatio()
    shader.uniforms.uEnergy.value = energy.current
  })

  return (
    <points ref={ref} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[data.scales, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={PARTICLE_VERTEX}
        fragmentShader={PARTICLE_FRAGMENT}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uEnergy: { value: 0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene({ pointer, hover, nearCount, farCount }) {
  const group = useRef()
  const energy = useRef(0)

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime
    const smooth = Math.min(1, dt * 2.4)
    const camera = state.camera

    energy.current += (hover.current - energy.current) * Math.min(1, dt * 3)

    camera.position.x += (pointer.current.x * 0.5 - camera.position.x) * smooth
    camera.position.y += (-pointer.current.y * 0.38 - camera.position.y) * smooth
    camera.lookAt(0, 0, 0)

    group.current.rotation.y += (pointer.current.x * 0.32 - group.current.rotation.y) * smooth
    group.current.rotation.x += (pointer.current.y * 0.2 - group.current.rotation.x) * smooth
    group.current.rotation.z = window.scrollY * 0.0009

    const entrance = 0.92 + Math.min(1, time / 1.6) * 0.08
    group.current.scale.setScalar(entrance + energy.current * 0.02)
  })

  return (
    <group ref={group}>
      {RINGS.map((ring, index) => (
        <Ring key={ring.color} {...ring} index={index} energy={energy} />
      ))}
      {SHARDS.map((shard) => (
        <Shard key={`${shard.geometry}-${shard.phase}`} config={shard} energy={energy} />
      ))}
      <ParticleField
        count={nearCount}
        energy={energy}
        innerRadius={2.1}
        outerRadius={3.2}
        palette={NEAR_COLORS}
        rotation={[0.18, 0, 0.08]}
        seedOffset={11}
        size={1.6}
        speed={0.05}
      />
      <ParticleField
        count={farCount}
        energy={energy}
        innerRadius={2.9}
        outerRadius={3.85}
        palette={FAR_COLORS}
        rotation={[-0.22, 0.4, -0.1]}
        seedOffset={977}
        size={0.95}
        speed={-0.032}
      />
    </group>
  )
}

function PortraitScene() {
  const wrapRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const hover = useRef(0)
  const [visible, setVisible] = useState(true)
  const [coarsePointer] = useState(() => window.matchMedia('(pointer: coarse)').matches)

  const nearCount = coarsePointer ? 340 : 720
  const farCount = coarsePointer ? 240 : 500

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2

      const element = wrapRef.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const dx = event.clientX - (bounds.left + bounds.width / 2)
      const dy = event.clientY - (bounds.top + bounds.height / 2)
      hover.current = Math.hypot(dx, dy) < bounds.width * 0.42 ? 1 : 0
    }

    const onLeave = () => {
      pointer.current.x = 0
      pointer.current.y = 0
      hover.current = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (wrapRef.current) observer.observe(wrapRef.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="portrait-canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, coarsePointer ? 1.4 : 1.8]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene pointer={pointer} hover={hover} nearCount={nearCount} farCount={farCount} />
      </Canvas>
    </div>
  )
}

export default PortraitScene
