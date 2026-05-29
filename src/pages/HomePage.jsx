import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground'
import { roadmapsRegistry, roadmapsList } from '../data/roadmapsRegistry'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-screen min-h-screen bg-[#020817] relative overflow-auto flex flex-col items-center justify-center gap-10 sm:gap-16 py-12 sm:py-0">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-3xl sm:text-5xl font-black tracking-tight mb-3 px-4"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Developer Roadmap
        </motion.h1>
        <motion.p
          className="text-slate-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Choose your learning path
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 w-full max-w-6xl">
        {roadmapsList.map((id, index) => {
          const roadmap = roadmapsRegistry[id]
          const bubbleCount = roadmap.nodes.filter(n => n.type === 'bubbleNode').length
          return (
            <RoadmapCard
              key={id}
              roadmap={roadmap}
              bubbleCount={bubbleCount}
              index={index}
              onClick={() => navigate(`/roadmap/${id}`)}
            />
          )
        })}
      </div>
    </div>
  )
}

function RoadmapCard({ roadmap, bubbleCount, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 0 50px ${roadmap.color}25, 0 20px 40px rgba(0,0,0,0.4)`,
      }}
      onClick={onClick}
      className="flex flex-col items-center gap-5 p-6 sm:p-8 rounded-2xl cursor-pointer w-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 20px ${roadmap.color}10, 0 8px 24px rgba(0,0,0,0.3)`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {roadmap.icon && roadmap.icon.startsWith('http') ? (
        <img src={roadmap.icon} alt={roadmap.label} className="w-16 h-16 object-contain" />
      ) : (
        <span className="text-6xl">{roadmap.icon}</span>
      )}

      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">{roadmap.label}</h2>
        <p className="text-slate-400 text-xs leading-relaxed">{roadmap.description}</p>
      </div>

      <span
        className="text-xs px-3 py-1 rounded-full font-semibold"
        style={{
          background: `${roadmap.color}18`,
          color: roadmap.color,
          border: `1px solid ${roadmap.color}35`,
        }}
      >
        {bubbleCount} topics
      </span>

      <motion.button
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
        style={{
          background: `linear-gradient(135deg, ${roadmap.color}, ${roadmap.color}bb)`,
        }}
        whileHover={{ filter: 'brightness(1.15)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        Start →
      </motion.button>
    </motion.div>
  )
}
