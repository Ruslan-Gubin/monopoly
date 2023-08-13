import { render, screen } from '@testing-library/react'
import { GamesList } from './GamesList'
import { NextRouter } from 'next/router'

const mockRouter: Partial<NextRouter> = {
  pathname: '/',
  push: jest.fn(),
}

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}))

describe('GamesList ', () => {
  it('Check GamesList  in document', () => {
    render(<GamesList />)
    const rootId = screen.getByTestId('games-list-testid')
    expect(rootId).toBeInTheDocument()
  })
  it('Check text ', () => {
    render(<GamesList />)
    const textLogo = screen.getByText(/Игры онлайн/i)
    expect(textLogo).toBeInTheDocument()
  })

})