import { motion } from 'framer-motion'
import { X, BookOpen, PlayCircle, Code, Terminal, CheckCircle } from 'lucide-react'

export default function TopicModal({ nodeData, nodeId, status, onClose, onComplete }) {
  const { label, icon, topic } = nodeData
  const isCompleted = status === 'completed'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 22, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 25px 50px rgba(0,0,0,0.6)',
        }}
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{label}</h2>
              {isCompleted && (
                <span className="flex items-center gap-1 text-xs text-green-400 mt-0.5">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">
          <p className="text-slate-300 leading-relaxed">{topic.description}</p>

          {/* Notes */}
          <Section icon={<BookOpen className="w-4 h-4 text-cyan-400" />} title="Notes">
            <div
              className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {topic.notes}
            </div>
          </Section>

          {/* Video Resources */}
          <Section icon={<PlayCircle className="w-4 h-4 text-red-400" />} title="Video Resources">
            <div className="space-y-2">
              {topic.videos.map((v, i) => (
                <motion.a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.07)' }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-red-950/60 flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{v.title}</span>
                </motion.a>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section icon={<Code className="w-4 h-4 text-purple-400" />} title="Projects">
            <ul className="space-y-2">
              {topic.projects.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          {/* Practice Challenges */}
          <Section icon={<Terminal className="w-4 h-4 text-cyan-400" />} title="Practice Challenges">
            <ul className="space-y-2">
              {topic.practice.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-cyan-400 font-mono flex-shrink-0 mt-0.5">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Footer CTA */}
        <div
          className="px-6 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <motion.button
            onClick={!isCompleted ? () => onComplete(nodeId) : undefined}
            disabled={isCompleted}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
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
    </div>
  )
}

function Section({ icon, title, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}
