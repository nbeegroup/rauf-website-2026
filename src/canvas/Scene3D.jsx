import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Preload, Sparkles, TorusKnot } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ParticleField({ count }) {
  const points = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    let seed = 17
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (random() - 0.5) * 18
      values[i * 3 + 1] = (random() - 0.5) * 12
      values[i * 3 + 2] = (random() - 0.5) * 10 - 2
    }
    return values
  }, [count])
  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.012
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.pointer.y * 0.06, 0.02)
  })
  return <points ref={points} frustumCulled><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={0.013} color="#c7f35b" transparent opacity={0.32} sizeAttenuation /></points>
}

function LearningSculpture({ reducedMotion }) {
  const group = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (event) => { target.current.x = (event.clientX / window.innerWidth - 0.5) * 2; target.current.y = (event.clientY / window.innerHeight - 0.5) * -2 }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target.current.x * 0.18, 0.035)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, target.current.y * 0.1, 0.035)
    group.current.rotation.z += delta * 0.025
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.08
  })
  return (
    <group ref={group} position={[3.15, 0.1, -2.4]} rotation={[0.15, -0.25, -0.2]}>
      <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <TorusKnot args={[1.28, 0.34, 180, 24, 2, 3]}><meshPhysicalMaterial color="#3157ff" roughness={0.2} metalness={0.15} clearcoat={1} clearcoatRoughness={0.15} emissive="#1735a8" emissiveIntensity={0.32} /></TorusKnot>
      </Float>
      <Icosahedron args={[0.42, 1]} position={[-1.7, -1.1, 0.3]}><meshStandardMaterial color="#ff654f" roughness={0.45} /></Icosahedron>
      <Icosahedron args={[0.24, 1]} position={[1.45, 1.15, 0.5]}><meshStandardMaterial color="#c7f35b" emissive="#7e9c24" emissiveIntensity={0.25} /></Icosahedron>
      <Sparkles count={46} scale={5} size={1.6} speed={reducedMotion ? 0 : 0.18} color="#f3efe4" />
    </group>
  )
}

function World({ isMobile, reducedMotion }) {
  return <><ambientLight intensity={0.65} /><directionalLight position={[3, 4, 4]} intensity={2.4} color="#f3efe4" /><pointLight position={[2, -2, 2]} intensity={22} color="#ff654f" distance={7} /><ParticleField count={isMobile ? 4500 : 12000} /><LearningSculpture reducedMotion={reducedMotion} />{!isMobile && <EffectComposer multisampling={0}><Bloom luminanceThreshold={0.62} mipmapBlur intensity={0.5} /><Vignette eskil={false} offset={0.2} darkness={0.42} /></EffectComposer>}<Preload all /></>
}

export default function Scene3D() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reducedMotion = useReducedMotion()
  const [canRender] = useState(() => {
    try { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) } catch { return false }
  })
  if (!canRender || reducedMotion || isMobile) return null
  return <div className="canvas-layer" aria-hidden="true"><Canvas dpr={isMobile ? [0.75, 1] : [1, 1.5]} camera={{ position: [0, 0, 7], fov: isMobile ? 58 : 46, near: 0.1, far: 40 }} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}><Suspense fallback={null}><World isMobile={isMobile} reducedMotion={reducedMotion} /></Suspense></Canvas></div>
}
