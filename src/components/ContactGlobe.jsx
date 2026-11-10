import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PATEROS = { lat: 14.55, lon: 121.07 }

const SATELLITES = [
  { radius: 1.3, color: '#67e8f9', tilt: [0.65, 0, 0.2], speed: 0.42 },
  { radius: 1.44, color: '#e879f9', tilt: [1.1, 0.4, 0], speed: 0.3 },
  { radius: 1.2, color: '#a78bfa', tilt: [-0.5, 0.8, 0.4], speed: 0.55 },
]

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function createGlowTexture(red, green, blue) {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 1)`)
  gradient.addColorStop(0.28, `rgba(${red}, ${green}, ${blue}, 0.42)`)
  gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createGridGeometry() {
  const positions = []
  const radius = 1.003

  const addLoop = (points) => {
    for (let index = 0; index < points.length - 1; index += 1) {
      positions.push(
        points[index].x, points[index].y, points[index].z,
        points[index + 1].x, points[index + 1].y, points[index + 1].z,
      )
    }
  }

  for (let latitude = -60; latitude <= 60; latitude += 30) {
    const ringRadius = Math.cos((latitude * Math.PI) / 180) * radius
    const y = Math.sin((latitude * Math.PI) / 180) * radius
    const points = []

    for (let step = 0; step <= 64; step += 1) {
      const angle = (step / 64) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * ringRadius, y, Math.sin(angle) * ringRadius))
    }

    addLoop(points)
  }

  for (let longitude = 0; longitude < 180; longitude += 30) {
    const rotation = (longitude * Math.PI) / 180
    const points = []

    for (let step = 0; step <= 64; step += 1) {
      const angle = (step / 64) * Math.PI * 2
      const x = Math.cos(angle) * radius
      points.push(new THREE.Vector3(x * Math.cos(rotation), Math.sin(angle) * radius, x * Math.sin(rotation)))
    }

    addLoop(points)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geometry
}

function createStarField(count) {
  const positions = new Float32Array(count * 3)

  for (let index = 0; index < count; index += 1) {
    const radius = 1.35 + Math.random() * 0.75
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions.set([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ], index * 3)
  }

  return positions
}

function GlobeScene({ pointer, hover }) {
  const globe = useRef()
  const markerRing = useRef()
  const markerGlow = useRef()
  const stars = useRef()
  const satellites = useRef([])
  const energy = useRef(0)

  const cyanGlow = useMemo(() => createGlowTexture(103, 232, 249), [])
  const violetGlow = useMemo(() => createGlowTexture(124, 58, 237), [])
  const gridGeometry = useMemo(() => createGridGeometry(), [])
  const starPositions = useMemo(() => createStarField(170), [])

  const marker = useMemo(() => latLonToVector3(PATEROS.lat, PATEROS.lon, 1), [])
  const markerNormal = useMemo(() => marker.clone().normalize(), [marker])
  const markerQuaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), markerNormal),
    [markerNormal],
  )
  const beamQuaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), markerNormal),
    [markerNormal],
  )
  const initialRotation = useMemo(() => -Math.atan2(marker.x, marker.z), [marker])

  useEffect(() => () => {
    cyanGlow.dispose()
    violetGlow.dispose()
    gridGeometry.dispose()
  }, [cyanGlow, violetGlow, gridGeometry])

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime
    const smooth = Math.min(1, dt * 2.4)
    energy.current += (hover.current - energy.current) * Math.min(1, dt * 4)

    const targetY = initialRotation + Math.sin(time * 0.22) * 0.7 + pointer.current.x * 0.28
    const targetX = 0.3 + pointer.current.y * 0.16
    globe.current.rotation.y += (targetY - globe.current.rotation.y) * smooth
    globe.current.rotation.x += (targetX - globe.current.rotation.x) * smooth

    const pulse = 1 + Math.sin(time * 2.4) * 0.16 + energy.current * 0.3
    markerRing.current.scale.setScalar(pulse)
    markerRing.current.material.opacity = 0.55 + Math.sin(time * 2.4) * 0.2 + energy.current * 0.2

    markerGlow.current.scale.setScalar(0.32 + Math.sin(time * 1.8) * 0.02 + energy.current * 0.08)
    markerGlow.current.material.opacity = 0.55 + Math.sin(time * 1.8) * 0.15 + energy.current * 0.25

    stars.current.rotation.y -= dt * 0.012

    satellites.current.forEach((satellite, index) => {
      if (!satellite) return
      satellite.rotation.y += dt * (SATELLITES[index].speed + energy.current * 0.35)
    })
  })

  return (
    <>
      <sprite position={[0, 0, -1.6]} scale={[3.4, 3.4, 1]}>
        <spriteMaterial map={violetGlow} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.016} color="#c4b5fd" transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>

      <group ref={globe} position={[0, 0.16, 0]} rotation={[0.3, initialRotation, 0]}>
        <mesh>
          <sphereGeometry args={[0.995, 32, 24]} />
          <meshBasicMaterial color="#0a1024" transparent opacity={0.94} />
        </mesh>

        <lineSegments geometry={gridGeometry}>
          <lineBasicMaterial color="#818cf8" transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>

        <mesh scale={1.06}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.14} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.012, 0.0035, 8, 160]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>

        {SATELLITES.map((satellite, index) => (
          <group
            key={satellite.color}
            ref={(element) => { satellites.current[index] = element }}
            rotation={satellite.tilt}
          >
            <mesh position={[satellite.radius, 0, 0]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshBasicMaterial color={satellite.color} toneMapped={false} />
            </mesh>
          </group>
        ))}

        <group position={marker.clone().multiplyScalar(1.01)}>
          <mesh>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial color="#67e8f9" toneMapped={false} />
          </mesh>

          <sprite
            ref={markerGlow}
            position={markerNormal.clone().multiplyScalar(0.035)}
            scale={[0.32, 0.32, 1]}
          >
            <spriteMaterial map={cyanGlow} color="#67e8f9" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>

          <mesh
            ref={markerRing}
            position={markerNormal.clone().multiplyScalar(0.02)}
            quaternion={markerQuaternion}
          >
            <torusGeometry args={[0.085, 0.0035, 8, 64]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
          </mesh>

          <mesh
            position={markerNormal.clone().multiplyScalar(0.13)}
            quaternion={beamQuaternion}
          >
            <cylinderGeometry args={[0.0035, 0.0035, 0.24, 6]} />
            <meshBasicMaterial color="#a5f3fc" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </>
  )
}

function ContactGlobe() {
  const wrapRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const hover = useRef(0)
  const [visible, setVisible] = useState(true)
  const [coarsePointer] = useState(() => window.matchMedia('(pointer: coarse)').matches)

  useEffect(() => {
    const onMove = (event) => {
      const element = wrapRef.current
      if (!element) return

      const bounds = element.getBoundingClientRect()
      const inside = event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom

      hover.current = inside ? 1 : 0

      if (!inside) {
        pointer.current.x = 0
        pointer.current.y = 0
        return
      }

      pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (wrapRef.current) observer.observe(wrapRef.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="contact-globe-canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, coarsePointer ? 1.4 : 1.7]}
        camera={{ position: [0, 0, 3.6], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <GlobeScene pointer={pointer} hover={hover} />
      </Canvas>
    </div>
  )
}

export default ContactGlobe
