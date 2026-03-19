import React, { useState, useEffect } from "react"
import styles from "./RecentChallenges.module.css"
import ChallengeCard from "./ChallengeCard"
import type { Challenge } from "../@types"

const RecentChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/challenges?limit=6`)
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des challenges")
        }
        const data: Challenge[] = await res.json()
        setChallenges(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  if (loading) {
    return <p>Chargement des Challenges...</p>
  }

  if (error) {
    return <p>Erreur : {error}</p>
  }

  return (
      <div className={`${styles.listContainer} neon-border-dual`}>
        <div className={styles.headerRow}>
          <div className={styles.title}>Challenges populaires / Challenges récents</div>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="Recherche"
              className={styles.searchBar}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={styles.carouselWrapper}>
          {/* <button className={styles.arrow}>&lt;</button> */}
          <div className={styles.grid}>
            {challenges.map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
              />
            ))}
          </div>
          {/* <button className={styles.arrow}>&gt;</button> */}
        </div>
      </div>
  )
}

export default RecentChallenges