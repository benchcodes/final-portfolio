import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RINGS = [
  { radius: 1.9, color: '#67e8f9', spin: [0.34, 0.1, 0], tilt: [1.2, 0.2, 0] },
  { radius: 2.15, color: '#a78bfa', spin: [-0.12, 0.3, 0.08], tilt: [0.3, 1.1, 0.4] },
  { radius: 2.4, color: '#e879f9', spin: [0.1, -0.16, 0.26], tilt: [-0.6, 0.4, 1.0] },
]

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function Ring({ radius, color, spin, tilt }) {
  const ref = useRef()

  useFrame((_, dt) => {
    ref.current.rotation.x += dt * spin[0]
    ref.current.rotation.y += dt * spin[1]
    ref.current.rotation.z += dt * spin[2]
  })

  return (
    <group ref={ref} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.011, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Halo({ pointer, count }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 2.8 + seededValue(i * 3 + 1) * 2.2
      const theta = seededValue(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(2 * seededValue(i * 3 + 3) - 1)
      data.set([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ], i * 3)
    }
    return data
  }, [count])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.04
    ref.current.position.x += (-pointer.current.x * 0.35 - ref.current.position.x) * Math.min(1, dt * 3)
    ref.current.position.y += (pointer.current.y * 0.25 - ref.current.position.y) * Math.min(1, dt * 3)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#c4b5fd" transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

function Rig({ pointer, children }) {
  const group = useRef()

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 4)
    const groupObject = group.current
    groupObject.rotation.y += (pointer.current.x * 0.6 - groupObject.rotation.y) * k
    groupObject.rotation.x += (pointer.current.y * 0.4 - groupObject.rotation.x) * k
    groupObject.rotation.z = window.scrollY * 0.0012
  })

  return <group ref={group}>{children}</group>
}

function PortraitScene() {
  const wrapRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const count = useMemo(() => (
    window.matchMedia('(pointer: coarse)').matches ? 350 : 800
  ), [])

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(wrapRef.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="portrait-canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Rig pointer={pointer}>
          {RINGS.map((ring) => <Ring key={ring.color} {...ring} />)}
        </Rig>
        <Halo pointer={pointer} count={count} />
      </Canvas>
    </div>
  )
}

export default PortraitScene
