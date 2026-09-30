import { Canvas, useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useMemo, useRef, useState } from 'react'
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
  return <points ref={points} frustumCulled><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={0.013} color="#FDCE0B" transparent opacity={0.32} sizeAttenuation /></points>
}

function ParticleWorld({ isMobile }) {
  return <><ParticleField count={isMobile ? 4500 : 12000} />{!isMobile && <EffectComposer multisampling={0}><Bloom luminanceThreshold={0.62} mipmapBlur intensity={0.5} /><Vignette eskil={false} offset={0.2} darkness={0.42} /></EffectComposer>}<Preload all /></>
}

export default function Scene3D() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reducedMotion = useReducedMotion()
  const [canRender] = useState(() => {
    try { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) } catch { return false }
  })
  if (!canRender || reducedMotion || isMobile) return null
  return <div className="canvas-layer" aria-hidden="true"><Canvas dpr={isMobile ? [0.75, 1] : [1, 1.5]} camera={{ position: [0, 0, 7], fov: isMobile ? 58 : 46, near: 0.1, far: 40 }} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}><Suspense fallback={null}><ParticleWorld isMobile={isMobile} /></Suspense></Canvas></div>
}
