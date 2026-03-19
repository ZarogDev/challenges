import React, { useState, useEffect } from "react"
import styles from "./ChallengeList.module.css"
import ChallengeCard from "./ChallengeCard"

type Challenge = {
  id: number
  image: string
  title: string
  creator: string
}

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/challenges")
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
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Relève le défi, prouve ta valeur !
      </h2>

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
          <button className={styles.arrow}>&lt;</button>
          <div className={styles.grid}>
            {challenges.map((c) => (
              <ChallengeCard
                key={c.id}
                image={c.image}
                title={c.title}
                creator={c.creator}
              />
            ))}
          </div>
          <button className={styles.arrow}>&gt;</button>
        </div>
      </div>
    </section>
  )
}

export default ChallengeList