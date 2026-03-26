import React, { useState, useEffect, useRef } from "react"
import styles from "./RecentChallenges.module.css"
import ChallengeCard from "./ChallengeCard"
import type { Challenge } from "../@types"

const RecentChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/challenges?limit=6`)
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des challenges")
        }
        const data = await res.json()
        const challenges: Challenge[] = data.data;
        setChallenges(challenges)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchChallenges()
  }, [])

  /* Détecte la carte visible au scroll */
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const handleScroll = () => {
      const scrollLeft = grid.scrollLeft
      const cardWidth = grid.offsetWidth
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(index)
    }

    grid.addEventListener("scroll", handleScroll, { passive: true })
    return () => grid.removeEventListener("scroll", handleScroll)
  }, [challenges])

  /* Clic sur un point → scroll vers la carte */
  const goToIndex = (index: number) => {
    const grid = gridRef.current
    if (!grid) return
    grid.scrollTo({ left: index * grid.offsetWidth, behavior: "smooth" })
    setActiveIndex(index)
  }

  if (loading) return <p>Chargement des Challenges...</p>
  if (error) return <p>Erreur : {error}</p>

  return (
    <div className={`${styles.listContainer} neon-border-dual`}>
      <div className={styles.headerRow}>
        <div className={styles.title}>Nos derniers challenges</div>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.grid} ref={gridRef}>
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </div>

      {/* Points de pagination — visibles uniquement sur mobile */}
      <div className={styles.dots}>
        {challenges.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => goToIndex(i)}
            aria-label={`Challenge ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentChallenges
