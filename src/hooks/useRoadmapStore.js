import { useState, useCallback } from 'react'

export function useRoadmapStore() {
  const [completed, setCompleted] = useState(() => new Set())

  const markComplete = useCallback((id) => {
    setCompleted(prev => {
      if (prev.has(id)) return prev
      return new Set([...prev, id])
    })
  }, [])

  const getStatus = useCallback(
    (id, prerequisite) => {
      if (completed.has(id)) return 'completed'
      if (prerequisite === null || completed.has(prerequisite)) return 'active'
      return 'locked'
    },
    [completed]
  )

  return { completed, markComplete, getStatus }
}
