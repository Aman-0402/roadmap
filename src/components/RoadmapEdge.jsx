import { getBezierPath } from '@xyflow/react'

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
    <path
      id={id}
      d={edgePath}
      fill="none"
      stroke={isActive ? '#06b6d4' : '#1e3a5f'}
      strokeWidth={isActive ? 2 : 1.5}
      strokeDasharray="4 6"
      style={isActive ? { animation: 'march 1s linear infinite' } : undefined}
    />
  )
}
