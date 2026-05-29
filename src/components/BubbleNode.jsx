import { memo } from 'react'
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
  const { label, icon, status, onClick, completing } = data
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isActive = status === 'active'

  const borderColor = isCompleted ? '#22c55e' : isActive ? '#06b6d4' : '#334155'
  const glowColor = isCompleted ? '#22c55e' : isActive ? '#06b6d4' : null

  return (
    <div data-status={status}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <motion.div
        animate={completing
          ? { scale: [1, 1.35, 1], transition: { duration: 0.6, times: [0, 0.4, 1] } }
          : !isLocked ? floatAnimation(id) : undefined
        }
        whileHover={!isLocked ? { scale: 1.08 } : undefined}
        whileTap={!isLocked ? { scale: 0.95 } : undefined}
        onClick={!isLocked ? () => onClick(id) : undefined}
        className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center select-none"
        style={{
          cursor: isLocked ? 'not-allowed' : 'pointer',
          background: isLocked
            ? '#0f172a'
            : 'radial-gradient(circle at 30% 30%, #0e2640, #020817)',
          border: `2px solid ${borderColor}`,
          boxShadow: glowColor
            ? `0 0 20px ${glowColor}40, 0 0 50px ${glowColor}20`
            : 'none',
        }}
      >
        {/* Lock overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-slate-900/70 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lock className="w-5 h-5 text-slate-500" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed badge */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              className="absolute -top-1.5 -right-1.5 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
            >
              <CheckCircle className="w-6 h-6 text-green-400 fill-green-950" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-2xl mb-1 relative z-10">{icon}</span>
        <span
          className="text-xs font-bold tracking-wide relative z-10"
          style={{ color: isLocked ? '#475569' : '#f1f5f9' }}
        >
          {label}
        </span>

        {/* Active pulse ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #06b6d4' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
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
      </motion.div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  )
}

export default memo(BubbleNode)
