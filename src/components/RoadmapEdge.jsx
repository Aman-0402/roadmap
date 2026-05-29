import { BaseEdge, getBezierPath } from '@xyflow/react'

export default function RoadmapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const isActive = data?.active

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: isActive ? '#8b5cf6' : '#1e3a5f',
          strokeWidth: isActive ? 2.5 : 1.5,
          strokeDasharray: isActive ? 'none' : '6 5',
          filter: isActive ? 'drop-shadow(0 0 6px #8b5cf680)' : 'none',
          transition: 'stroke 0.6s, strokeWidth 0.6s',
        }}
      />

      {/* Animated dot that travels along active edges */}
      {isActive && (
        <circle r="4" fill="#a855f7" filter="drop-shadow(0 0 4px #a855f7)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  )
}
