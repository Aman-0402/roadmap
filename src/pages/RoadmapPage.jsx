import { useState, useMemo, useCallback } from 'react'
import { ReactFlow, Background } from '@xyflow/react'
import { AnimatePresence } from 'framer-motion'
import '@xyflow/react/dist/style.css'

import { roadmapNodes, roadmapEdges } from '../data/roadmapData'
import { useRoadmapStore } from '../hooks/useRoadmapStore'
import BubbleNode from '../components/BubbleNode'
import RoadmapEdge from '../components/RoadmapEdge'
import TopicModal from '../components/TopicModal'
import ParticleBackground from '../components/ParticleBackground'

const NODE_TYPES = { bubbleNode: BubbleNode }
const EDGE_TYPES = { roadmapEdge: RoadmapEdge }

export default function RoadmapPage() {
  const { completed, getStatus, markComplete } = useRoadmapStore()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [completingNodeId, setCompletingNodeId] = useState(null)

  const handleNodeClick = useCallback((nodeId) => {
    setSelectedNodeId(nodeId)
  }, [])

  const handleComplete = useCallback(async (nodeId) => {
    setSelectedNodeId(null)
    await new Promise((r) => setTimeout(r, 280))
    setCompletingNodeId(nodeId)
    markComplete(nodeId)
    setTimeout(() => setCompletingNodeId(null), 1000)
  }, [markComplete])

  const nodes = useMemo(
    () =>
      roadmapNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: getStatus(node.id, node.data.prerequisite),
          onClick: handleNodeClick,
          completing: completingNodeId === node.id,
        },
      })),
    [getStatus, handleNodeClick, completingNodeId]
  )

  const edges = useMemo(
    () =>
      roadmapEdges.map((edge) => ({
        ...edge,
        data: { active: completed.has(edge.source) },
        animated: false,
      })),
    [completed]
  )

  const selectedNode = selectedNodeId
    ? roadmapNodes.find((n) => n.id === selectedNodeId)
    : null

  const completedCount = completed.size
  const totalCount = roadmapNodes.length

  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Frontend Roadmap
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 tracking-wide">
            Click a bubble to explore the topic
          </p>
        </div>

        {/* Progress pill */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-slate-400 text-xs">Progress</span>
          <span className="text-white font-bold text-sm">
            {completedCount} / {totalCount}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* React Flow canvas */}
      <div className="absolute inset-0 z-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        >
          <Background color="#0f2040" gap={36} size={1} />
        </ReactFlow>
      </div>

      {/* Modal — mounted above canvas */}
      <AnimatePresence>
        {selectedNode && (
          <div className="absolute inset-0 z-30" key={selectedNodeId}>
            <TopicModal
              nodeData={selectedNode.data}
              nodeId={selectedNodeId}
              status={getStatus(selectedNodeId, selectedNode.data.prerequisite)}
              onClose={() => setSelectedNodeId(null)}
              onComplete={handleComplete}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
