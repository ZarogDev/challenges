import CGUPage from '../src/components/CGUPage';
import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('CGUPage', () => {
  it('should display main title', () => {
    render(<CGUPage />)

    expect(
      screen.getByRole('heading', {
        name: /conditions générales d'utilisation/i,
        level: 1,
      })
    ).toBeInTheDocument()
  })

  it('should display subtitle', () => {
    render(<CGUPage />)

    expect(
      screen.getByText(/gamerchallenges — règles et fonctionnement/i)
    ).toBeInTheDocument()
  })

  it('display multiple headings', () => {
    render(<CGUPage />)

    expect(screen.getByRole('heading', { name: /objet/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /inscription/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /fonctionnalités/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
  })

  it('should display list elements', () => {
    render(<CGUPage />)

    expect(screen.getByText(/un email valide/i)).toBeInTheDocument()
    expect(screen.getByText(/un pseudonyme/i)).toBeInTheDocument()
    expect(screen.getByText(/un mot de passe sécurisé/i)).toBeInTheDocument()
  })

  it('display main features', () => {
    render(<CGUPage />)

    expect(screen.getByText(/créer des challenges/i)).toBeInTheDocument()
    expect(screen.getByText(/participer à des défis/i)).toBeInTheDocument()
    expect(screen.getByText(/publier des performances/i)).toBeInTheDocument()
  })

  it('display mail conatct', () => {
    render(<CGUPage />)

    expect(screen.getByText(/pour toute question relative aux cgu/i)).toBeInTheDocument()
    expect(screen.getByText(/\[adresse e-mail de contact\]/i)).toBeInTheDocument()
  })

  it('should contain at least 10 sections', () => {
    render(<CGUPage />)

    const sections = screen.getAllByRole('heading', { level: 2 })
    expect(sections.length).toBeGreaterThan(10)
  })
})