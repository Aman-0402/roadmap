import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: ['#06b6d4', '#8b5cf6', '#a855f7'] },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
          },
          number: { value: 80, density: { enable: true, area: 800 } },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 1, max: 2.5 } },
          links: { enable: false },
        },
        detectRetina: true,
      }}
    />
  )
}
