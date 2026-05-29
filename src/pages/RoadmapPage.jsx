import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ReactFlow, Background } from '@xyflow/react'
import { AnimatePresence } from 'framer-motion'
import '@xyflow/react/dist/style.css'

import { roadmapsRegistry } from '../data/roadmapsRegistry'
import { useRoadmapStore } from '../hooks/useRoadmapStore'
import BubbleNode from '../components/BubbleNode'
import RoadmapEdge from '../components/RoadmapEdge'
import TrackLabelNode from '../components/TrackLabelNode'
import TopicModal from '../components/TopicModal'
import ParticleBackground from '../components/ParticleBackground'

const NODE_TYPES = { bubbleNode: BubbleNode, trackLabel: TrackLabelNode }
const EDGE_TYPES = { roadmapEdge: RoadmapEdge }

// Shell component: guards unknown IDs before any hooks are called
export default function RoadmapPage() {
  const { id } = useParams()
  const roadmap = roadmapsRegistry[id]
  if (!roadmap) return <Navigate to="/" replace />
  return <RoadmapCanvas roadmap={roadmap} />
}

// Inner component: all hooks live here, roadmap is always defined
function RoadmapCanvas({ roadmap }) {
  const navigate = useNavigate()
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
      roadmap.nodes.map((node) => {
        if (node.type === 'trackLabel') return node
        return {
          ...node,
          data: {
            ...node.data,
            status: getStatus(node.id, node.data.prerequisite),
            onClick: handleNodeClick,
            completing: completingNodeId === node.id,
          },
        }
      }),
    [roadmap.nodes, getStatus, handleNodeClick, completingNodeId]
  )

  const edges = useMemo(
    () =>
      roadmap.edges.map((edge) => ({
        ...edge,
        data: { active: completed.has(edge.source) },
        animated: false,
      })),
    [roadmap.edges, completed]
  )

  const selectedNode = selectedNodeId
    ? roadmap.nodes.find((n) => n.id === selectedNodeId)
    : null

  const completedCount = completed.size
  const totalCount = roadmap.nodes.filter((n) => n.type === 'bubbleNode').length

  return (
    <div className="w-screen h-screen bg-[#020817] relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            ← Back
          </button>
          <div>
            <h1
              className="text-2xl font-black tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${roadmap.color}, #a855f7)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {roadmap.label} Roadmap
            </h1>
            <p className="text-slate-500 text-xs mt-0.5 tracking-wide">
              Click a bubble to explore the topic
            </p>
          </div>
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
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                background: `linear-gradient(90deg, ${roadmap.color}, #8b5cf6)`,
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

      {/* Modal */}
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
