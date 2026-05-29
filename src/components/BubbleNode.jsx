import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'

const floatAnimation = (id) => {
  const seed = id.charCodeAt(0)
  return {
    y: [0, -(8 + (seed % 6)), 0],
    transition: {
      duration: 2.5 + (seed % 15) / 10,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: (seed % 10) / 10,
    },
  }
}

function BubbleNode({ id, data }) {
  const { label, icon, step, status, onClick, completing, topic, difficulty } = data
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isActive = status === 'active'
  const [isHovered, setIsHovered] = useState(false)

  const stepLabel = step ? String(step).padStart(2, '0') : null

  return (
    <div data-status={status}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <motion.div
        animate={
          completing
            ? { scale: [1, 1.4, 1], transition: { duration: 0.6, times: [0, 0.4, 1] } }
            : !isLocked
            ? floatAnimation(id)
            : undefined
        }
        whileHover={!isLocked ? { scale: 1.05 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
        onClick={!isLocked && onClick ? () => onClick(id) : undefined}
        onMouseEnter={() => !isLocked && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center select-none"
        style={{
          cursor: isLocked ? 'not-allowed' : 'pointer',
          background: isLocked
            ? '#0f172a'
            : 'radial-gradient(circle at 30% 30%, #0e2640, #020817)',
          border: isCompleted
            ? '2px solid #22c55e'
            : isActive
            ? '2px solid #06b6d4'
            : '2px solid #1e3a5f',
          boxShadow: isCompleted
            ? '0 0 20px #22c55e40, 0 0 50px #22c55e20'
            : isActive
            ? '0 0 20px #06b6d440, 0 0 50px #06b6d420'
            : 'none',
          opacity: isLocked ? 0.5 : 1,
        }}
      >
        {/* Step badge — top left */}
        {stepLabel && (
          <div
            className="absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center font-black z-10"
            style={{
              background: isCompleted ? '#22c55e' : isActive ? '#06b6d4' : '#334155',
              color: '#fff',
              fontSize: '0.6rem',
            }}
          >
            {stepLabel}
          </div>
        )}

        {/* Lock overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-slate-900/70 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lock className="w-6 h-6 text-slate-500" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed badge — top right */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              className="absolute -top-2 -right-2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
            >
              <CheckCircle className="w-7 h-7 text-green-400 fill-green-950" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <span className="text-4xl mb-1.5 relative z-10">{icon}</span>

        {/* Label */}
        <span
          className="text-xs font-bold tracking-wide relative z-10 text-center px-2 leading-tight"
          style={{
            color: isLocked ? '#475569' : '#f1f5f9',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>

        {/* Active: pulsing inner ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #06b6d4', pointerEvents: 'none' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Active: rotating outer dashed orbit ring */}
        {isActive && (
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-10px',
              border: '2px dashed #06b6d480',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Completing flash ring */}
        {completing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '3px solid #22c55e' }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Hover tooltip */}
        <AnimatePresence>
          {isHovered && topic && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(100% + 14px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '230px',
                zIndex: 100,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="rounded-xl p-3.5"
                style={{
                  background: 'rgba(6, 14, 28, 0.96)',
                  border: `1px solid ${isCompleted ? 'rgba(34,197,94,0.4)' : 'rgba(6,182,212,0.35)'}`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                }}
              >
                {difficulty && (
                  <span
                    className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded-full mb-2"
                    style={{
                      background: isCompleted ? 'rgba(34,197,94,0.15)' : 'rgba(6,182,212,0.12)',
                      color: isCompleted ? '#4ade80' : '#22d3ee',
                      border: isCompleted ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(6,182,212,0.25)',
                    }}
                  >
                    {difficulty}
                  </span>
                )}
                <p className="text-xs text-slate-300 leading-relaxed">{topic.description}</p>
                <p
                  className="text-xs font-semibold mt-2"
                  style={{ color: isCompleted ? '#4ade80' : '#06b6d4' }}
                >
                  {isCompleted ? '✓ Completed — click to review' : 'Click to explore →'}
                </p>
              </div>
              {/* Arrow pointing down */}
              <div
                className="absolute left-1/2 -bottom-1.5"
                style={{
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `6px solid ${isCompleted ? 'rgba(34,197,94,0.4)' : 'rgba(6,182,212,0.35)'}`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  )
}

export default memo(BubbleNode)
