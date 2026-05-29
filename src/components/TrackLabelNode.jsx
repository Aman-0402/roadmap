export default function TrackLabelNode({ data }) {
  return (
    <div
      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase select-none"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#94a3b8',
        whiteSpace: 'nowrap',
      }}
    >
      {data.label}
    </div>
  )
}
