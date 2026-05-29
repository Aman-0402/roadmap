import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import BubbleNode from './BubbleNode'

const wrap = (ui) => render(<ReactFlowProvider>{ui}</ReactFlowProvider>)

const baseProps = (overrides = {}) => ({
  id: 'html',
  data: {
    label: 'HTML',
    icon: '🌐',
    status: 'active',
    onClick: vi.fn(),
    completing: false,
    ...overrides,
  },
})

describe('BubbleNode', () => {
  it('renders the label', () => {
    wrap(<BubbleNode {...baseProps()} />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    wrap(<BubbleNode {...baseProps()} />)
    expect(screen.getByText('🌐')).toBeInTheDocument()
  })

  it('calls onClick with node id when active and clicked', () => {
    const onClick = vi.fn()
    wrap(<BubbleNode {...baseProps({ onClick })} />)
    fireEvent.click(screen.getByText('HTML'))
    expect(onClick).toHaveBeenCalledWith('html')
  })

  it('does not call onClick when locked', () => {
    const onClick = vi.fn()
    wrap(<BubbleNode {...baseProps({ status: 'locked', onClick })} />)
    fireEvent.click(screen.getByText('HTML'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows lock icon when locked', () => {
    wrap(<BubbleNode {...baseProps({ status: 'locked' })} />)
    expect(document.querySelector('[data-status="locked"]')).toBeInTheDocument()
  })

  it('shows checkmark badge when completed', () => {
    wrap(<BubbleNode {...baseProps({ status: 'completed' })} />)
    expect(document.querySelector('[data-status="completed"]')).toBeInTheDocument()
  })
})
