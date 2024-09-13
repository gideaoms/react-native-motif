import { describe, it, expect } from 'vitest'
import { styled } from './mod'

describe('styled', () => {
  it('successfully should create a style', () => {
    const button = styled({
      color: {
        primary: 'red',
        secondary: 'blue'
      },
    })
    expect(button.color.get('primary')).toBe('red')
    expect(button.color.get('secondary')).toBe('blue')
    expect(button.color.primary).toBe('red')
    expect(button.color.secondary).toBe('blue')
  })
})
