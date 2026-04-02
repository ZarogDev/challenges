import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer';
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('should display legal links', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', { name: /mentions légales/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /politique de confidentialité/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /cgu/i })
    ).toBeInTheDocument()
  })

  it('should have href with valid link', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', { name: /mentions légales/i })
    ).toHaveAttribute('href', '/mentions-legales')

    expect(
      screen.getByRole('link', { name: /politique de confidentialité/i })
    ).toHaveAttribute('href', '/confidentialite')

    expect(
      screen.getByRole('link', { name: /cgu/i })
    ).toHaveAttribute('href', '/cgu')
  })

  it('should display copyright', () => {
    render(<Footer />)

    expect(
      screen.getByText(/copyright 2026 gamerchallenges/i)
    ).toBeInTheDocument()
  })

  it('should display image with an alt', () => {
    render(<Footer />)

    const img = screen.getByRole('img', { name: /manette/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/logo-manette.png')
  })
})