import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, PlayCircle } from 'lucide-react'

const TABS = ['Learn', 'Videos', 'Projects', 'Practice']

const DIFFICULTY_COLORS = {
  Beginner:     { bg: 'rgba(34,197,94,0.12)',  text: '#4ade80', border: 'rgba(34,197,94,0.3)' },
  Intermediate: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Advanced:     { bg: 'rgba(239,68,68,0.12)',  text: '#f87171', border: 'rgba(239,68,68,0.3)' },
}

export default function RightPanel({ nodeData, nodeId, status, totalCount, onClose, onComplete }) {
  const [activeTab, setActiveTab] = useState('Learn')
  const { label, icon, step, difficulty, topic } = nodeData
  const isCompleted = status === 'completed'
  const diffStyle = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.Beginner

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-30 flex flex-col"
      style={{
        width: '420px',
        background: 'rgba(8, 18, 35, 0.97)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
      }}
      initial={{ x: 420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 420, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <div>
            {step && totalCount && (
              <p className="text-xs text-slate-500 mb-0.5">Step {step} of {totalCount}</p>
            )}
            <h2 className="text-xl font-bold text-white leading-tight">{label}</h2>
            {difficulty && (
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1"
                style={{
                  background: diffStyle.bg,
                  color: diffStyle.text,
                  border: `1px solid ${diffStyle.border}`,
                }}
              >
                {difficulty}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-3 text-xs font-semibold tracking-wide transition-colors relative"
            style={{ color: activeTab === tab ? '#06b6d4' : '#64748b' }}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: '#06b6d4' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {activeTab === 'Learn' && (
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed text-sm">{topic.description}</p>
            {topic.notes && (
              <div
                className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {topic.notes}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Videos' && (
          <div className="space-y-2">
            {(topic.videos ?? []).map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl group transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-red-950/60 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {v.title}
                </span>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'Projects' && (
          <ul className="space-y-2">
            {(topic.projects ?? []).map((p, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'Practice' && (
          <ul className="space-y-2">
            {topic.practice && topic.practice.length > 0 ? (
              topic.practice.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-cyan-400 font-mono flex-shrink-0 mt-0.5">→</span>
                  {p}
                </li>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Challenges coming soon.</p>
            )}
          </ul>
        )}
      </div>

      {/* CTA footer */}
      <div
        className="px-6 py-4 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <motion.button
          onClick={!isCompleted ? () => onComplete(nodeId) : undefined}
          disabled={isCompleted}
          className="w-full py-3 rounded-xl font-bold text-sm tracking-wide"
          style={
            isCompleted
              ? {
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: '#4ade80',
                  cursor: 'not-allowed',
                }
              : {
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  color: '#fff',
                  cursor: 'pointer',
                }
          }
          whileHover={!isCompleted ? { scale: 1.02, filter: 'brightness(1.1)' } : undefined}
          whileTap={!isCompleted ? { scale: 0.98 } : undefined}
        >
          {isCompleted ? '✓ Already Completed' : 'Mark as Completed'}
        </motion.button>
      </div>
    </motion.div>
  )
}
