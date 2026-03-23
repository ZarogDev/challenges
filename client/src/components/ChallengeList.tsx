import React, { useState, useEffect } from "react"
import styles from "./ChallengeList.module.css"
import ChallengeCard from "./ChallengeCard"
import type { Challenge } from "../@types"

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("");

  const fetchChallenges = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/challenges`)
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

  useEffect(() => {
    fetchChallenges()
  }, []);

  useEffect(() => {
    if(!searchTerm.trim()) {
      fetchChallenges();
      return;
    }

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.gameTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
  
    setChallenges(filteredChallenges);
  }, [searchTerm, challenges]);

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
           {/* <div className={styles.title}>Challenges populaires / Challenges récents</div> */}
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Recherche par titre ou jeu"
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
                challenge={c}
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