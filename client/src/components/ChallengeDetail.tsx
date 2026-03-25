import React, { useEffect, useState } from "react"
import styles from "./ChallengeDetail.module.css"
// import { getEmbedUrl } from "../lib/utils"
import { useParams } from "react-router-dom"
import type { ChallengeWithParticipations } from "../@types"
import StarRating from "./StarRating"
import ParticipateModal from "./ParticipateModal"
import { useAuth } from "../context/AuthContext"
import RateChallengeModal from "./RateChallengeModal"
import RateParticipationModal from "./RateParticipationModal"
import ParticipationCard from "./ParticipationCard"

const ChallengeDetail: React.FC = () => {
  const [challenge, setChallenge] =
    useState<ChallengeWithParticipations | undefined>(undefined)
  const [showParticipate, setShowParticipate] = useState(false)
  const [showRateChallenge, setShowRateChallenge] = useState(false)
  const [participationToRate, setParticipationToRate] = useState<number | null>(
    null
  )

  const { id } = useParams()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/challenges/${id}/participations`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch challenge")
        }
        const data: ChallengeWithParticipations = await response.json()
        setChallenge(data)
      } catch (error) {
        console.error("Error fetching challenge:", error)
      }
    }
    fetchChallenge()
  }, [id])

  if (!challenge) return null

  return (
    <section className={styles.section}>
      {/* ── Bloc principal : image + infos ── */}
      <div className={styles.detailBlock}>
        <img
          src={challenge.gameThumbnail}
          alt={challenge.gameTitle}
          className={styles.mainImage}
        />

        <div className={styles.infoBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{challenge.title}</h1>
            <StarRating
              rating={challenge.averageChallengeScore}
              readOnly
            />
            {isLoggedIn && (
              <button
                className={styles.rateButton}
                onClick={() => setShowRateChallenge(true)}
              >
                Noter le challenge
              </button>
            )}
          </div>

          <p className={styles.game}>{challenge.gameTitle}</p>

          <div className={styles.divider} />

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionLabel}>Description / règles</p>
            <p className={styles.description}>{challenge.description}</p>
          </div>

          <div className={styles.conditionsBlock}>
            <p className={styles.descriptionLabel}>Conditions</p>
            <p className={styles.description}>{challenge.conditions}</p>
          </div>

          <p className={styles.creator}>
            Challenge créé par :{" "}
            <span className={styles.creatorName}>{challenge.creator}</span>
          </p>

          {isLoggedIn && (
            <button
              className={styles.participateButton}
              onClick={() => setShowParticipate(true)}
            >
              Participer au challenge
            </button>
          )}
        </div>
      </div>

      {/* ── Bloc participations ── */}
      <div className={`${styles.completionsBlock} neon-border-dual`}>
        <h2 className={styles.completionsTitle}>
          Ils ont relevé le challenge !
        </h2>

        <div className={styles.completionsGrid}>
          {challenge.participations.map((participation) => (
            <ParticipationCard key={participation.id} participation={participation} setParticipationToRate={setParticipationToRate}/>
          ))}
        </div>
      </div>

      {/* ── Popups ── */}
      {showParticipate && (
        <ParticipateModal
          challengeId={challenge.id}
          onClose={() => setShowParticipate(false)}
        />
      )}

      {showRateChallenge && (
        <RateChallengeModal
          challengeId={challenge.id}
          onClose={() => setShowRateChallenge(false)}
        />
      )}

      {participationToRate !== null && (
        <RateParticipationModal
          participationId={participationToRate}
          onClose={() => setParticipationToRate(null)}
        />
      )}
    </section>
  )
}

export default ChallengeDetail