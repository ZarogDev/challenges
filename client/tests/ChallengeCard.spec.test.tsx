import { render, screen } from '@testing-library/react';
import ChallengeCard from '../src/components/ChallengeCard';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom'

import { vi } from 'vitest'

// Mock des utils
vi.mock('../lib/utils', () => ({
  getAvatarColor: () => 'red',
  getAvatarBorder: () => 'blue',
  getInitialColor: () => 'white',
  getInitials: () => 'J',
}))

const mockChallenge = {
  id: 1,
  title: 'Speedrun Mario',
  description: 'Description',
  conditions: 'Difficile',
  gameId: 1,
  gameTitle: 'Super Mario Bros',
  gameThumbnail: '/mario.jpg',
  userId: 1,
  creator: {
    username: 'JohnDoe',
  },
  createdAt: "2026-04-01"
}

describe('ChallengeCard', () => {
  function renderComponent() {
    render(
      <MemoryRouter>
        <ChallengeCard challenge={mockChallenge} />
      </MemoryRouter>
    )
  }

  it('should display challenge infos', () => {
    renderComponent()

    expect(screen.getByText(/speedrun mario/i)).toBeInTheDocument()
    expect(screen.getByText(/super mario bros/i)).toBeInTheDocument()
    expect(screen.getByText(/créé par johndoe/i)).toBeInTheDocument()
  })

  it('should display image with proper alt', () => {
    renderComponent()

    const img = screen.getByRole('img', { name: /speedrun mario/i })
    expect(img).toHaveAttribute('src', '/mario.jpg')
  })

  it('should redirect with the proper link', () => {
    renderComponent()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/challenges/1')
  })

  it('should display creator inital', () => {
    renderComponent()

    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('should display participate button', () => {
    renderComponent()

    expect(
      screen.getByRole('button', { name: /participer/i })
    ).toBeInTheDocument()
  })
});