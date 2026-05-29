import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRoadmapStore } from './useRoadmapStore'

describe('useRoadmapStore', () => {
  it('html (null prerequisite) is unlocked by default', () => {
    const { result } = renderHook(() => useRoadmapStore())
    expect(result.current.getStatus('html', null)).toBe('active')
  })

  it('css (prerequisite: html) is locked by default', () => {
    const { result } = renderHook(() => useRoadmapStore())
    expect(result.current.getStatus('css', 'html')).toBe('locked')
  })

  it('after marking html complete, html status becomes completed', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('html', null)).toBe('completed')
  })

  it('after marking html complete, css becomes active', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('css', 'html')).toBe('active')
  })

  it('javascript stays locked until css is completed', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.getStatus('javascript', 'css')).toBe('locked')
    act(() => result.current.markComplete('css'))
    expect(result.current.getStatus('javascript', 'css')).toBe('active')
  })

  it('completed set exposed contains marked ids', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => result.current.markComplete('html'))
    expect(result.current.completed.has('html')).toBe(true)
    expect(result.current.completed.has('css')).toBe(false)
  })

  it('markComplete is idempotent — calling twice does not break state', () => {
    const { result } = renderHook(() => useRoadmapStore())
    act(() => {
      result.current.markComplete('html')
      result.current.markComplete('html')
    })
    expect(result.current.getStatus('html', null)).toBe('completed')
  })
})
