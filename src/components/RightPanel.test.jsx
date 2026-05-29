import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RightPanel from './RightPanel'

const mockNodeData = {
  label: 'HTML',
  icon: '🌐',
  step: 1,
  difficulty: 'Beginner',
  topic: {
    description: 'The backbone of every webpage.',
    notes: 'Key concepts: elements, tags, attributes.',
    videos: [{ title: 'HTML Crash Course', url: 'https://youtube.com/watch?v=abc' }],
    projects: ['Build a portfolio page'],
    practice: ['Create a form with all input types'],
  },
}

describe('RightPanel', () => {
  it('renders panel with node title', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('shows Step N of M in header', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument()
  })

  it('defaults to Learn tab and shows description', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('The backbone of every webpage.')).toBeInTheDocument()
  })

  it('switches to Videos tab and shows video links', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    fireEvent.click(screen.getByText('Videos'))
    expect(screen.getByText('HTML Crash Course')).toBeInTheDocument()
  })

  it('calls onComplete with nodeId when Mark as Completed clicked', () => {
    const onComplete = vi.fn()
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={onComplete}
      />
    )
    fireEvent.click(screen.getByText('Mark as Completed'))
    expect(onComplete).toHaveBeenCalledWith('html')
  })

  it('shows completed state and disables button when status is completed', () => {
    render(
      <RightPanel
        nodeData={mockNodeData}
        nodeId="html"
        status="completed"
        totalCount={4}
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('✓ Already Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '✓ Already Completed' })).toBeDisabled()
  })
})
