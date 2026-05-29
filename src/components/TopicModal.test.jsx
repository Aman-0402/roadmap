import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TopicModal from './TopicModal'

const mockNodeData = {
  label: 'HTML',
  icon: '🌐',
  topic: {
    description: 'The backbone of every webpage.',
    notes: 'Key concepts: elements, tags, attributes.',
    videos: [{ title: 'HTML Crash Course', url: 'https://youtube.com/watch?v=abc' }],
    projects: ['Build a portfolio page'],
    practice: ['Create a form with all input types'],
  },
}

describe('TopicModal', () => {
  it('renders topic title', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('The backbone of every webpage.')).toBeInTheDocument()
  })

  it('renders video links', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('HTML Crash Course')).toBeInTheDocument()
  })

  it('calls onComplete with nodeId when Mark as Completed clicked', () => {
    const onComplete = vi.fn()
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={vi.fn()}
        onComplete={onComplete}
      />
    )
    fireEvent.click(screen.getByText('Mark as Completed'))
    expect(onComplete).toHaveBeenCalledWith('html')
  })

  it('shows completed state and disables button when status is completed', () => {
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="completed"
        onClose={vi.fn()}
        onComplete={vi.fn()}
      />
    )
    expect(screen.getByText('✓ Already Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '✓ Already Completed' })).toBeDisabled()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <TopicModal
        nodeData={mockNodeData}
        nodeId="html"
        status="active"
        onClose={onClose}
        onComplete={vi.fn()}
      />
    )
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalled()
  })
})
