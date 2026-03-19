
import React, { useState, useEffect } from "react"
import styles from "./ChallengeList.module.css"
import ChallengeCard from "./ChallengeCard"

type Challenge = {
  id: number
  image: string
  title: string
  creator: string
}



//const mockChallenges = [
//  {
//    id: 1,
//    image: '/minecraft.jpg',
//    title: 'Speed Run Minecraft :\nTerminez le mode Survie',
//    creator: 'Gameone',
//  },
//  {
//    id: 2,
//    image: '/apex.jpg',
//    title: 'Dominante Suprême :\nGagnez 3 Matchs de Suite',
//    creator: 'GamerOne',
//  },
//  {
//    id: 3,
//    image: '/valorant.jpg',
//    title: "L'As Tactique :\nÉliminez l'Équipe Adverse",
//    creator: 'GamerOne',
//  },
//  {
//    id: 4,
//    image: '/csgo.jpg',
//    title: 'Le Gardien du Site :\nDésamorcez 3 Bombes',
//   creator: 'GamerOne',
//  },
//  {
//    id: 5,
//   image: '/fortnite.jpg',
//   title: 'Le Dernier Survivant :\nTop 1 sans élimination',
//   creator: 'GamerOne',
//  },
//  {
//    id: 6,
//    image: '/rocket.jpg',
//   title: 'Rocket League :\nMarquez 5 buts en ranked',
//   creator: 'GamerOne',
// },
//];


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