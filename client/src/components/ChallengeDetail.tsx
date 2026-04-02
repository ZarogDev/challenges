import React, { useEffect, useState, useRef } from "react"
import styles from "./ChallengeDetail.module.css"
import { useParams } from "react-router-dom"
import type { ChallengeWithParticipations } from "../@types"
import StarRating from "./StarRating"
import ParticipateModal from "./ParticipateModal"
import { useAuth } from "../context/AuthContext"
import RateChallengeModal from "./RateChallengeModal"
import RateParticipationModal from "./RateParticipationModal"
import ParticipationCard from "./ParticipationCard"
import Loader from "./Loader"

const ChallengeDetail: React.FC = () => {
  const [challenge, setChallenge] =
    useState<ChallengeWithParticipations | undefined>(undefined)
  const [showParticipate, setShowParticipate] = useState(false)
  const [showRateChallenge, setShowRateChallenge] = useState(false)
  const [participationToRate, setParticipationToRate] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null)

  const [hasRatedChallenge, setHasRatedChallenge] = useState(false)
  const [ratedParticipations, setRatedParticipations] =
    useState<Record<number, boolean>>({})

  const { id } = useParams()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchChallenge() {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/challenges/${id}/participations`,
          { signal: controller.signal }
        )
        if (!response.ok) throw new Error("Failed to fetch challenge")

        const data: ChallengeWithParticipations = await response.json()
        setChallenge(data)

        // Vérifier si l'utilisateur a déjà voté ce challenge
        try {
          const token = localStorage.getItem("token")
          const voteRes = await fetch(
            `${import.meta.env.VITE_API_URL}/challenges/${id}/votes/me`,
            {
              signal: controller.signal,
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            }
          )

          if (voteRes.ok) {
            const voteData = await voteRes.json()
            setHasRatedChallenge(Boolean(voteData.hasVoted))
          }
        } catch {
          // Ne pas écraser l'état si le fetch échoue
        }

        // Participations déjà notées (localStorage)
        const votedParticipations = JSON.parse(
          localStorage.getItem("votedParticipations") || "[]"
        ) as number[]
        const initialRated: Record<number, boolean> = {}
        data.participations.forEach((p) => {
          if (votedParticipations.includes(p.id)) {
            initialRated[p.id] = true
          }
        })
        setRatedParticipations(initialRated)
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching challenge:", error)
        }
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge()
    return () => controller.abort()
  }, [id])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const getCardWidth = () => grid.offsetWidth * 0.85 + 12

    const handleScroll = () => {
      const index = Math.round(grid.scrollLeft / getCardWidth())
      setActiveIndex(index)
    }

    grid.addEventListener("scroll", handleScroll, { passive: true })
    return () => grid.removeEventListener("scroll", handleScroll)
  }, [challenge])

  const goToIndex = (index: number) => {
    const grid = gridRef.current
    if (!grid) return
    const cardWidth = grid.offsetWidth * 0.85 + 12
    grid.scrollTo({ left: index * cardWidth, behavior: "smooth" })
    setActiveIndex(index)
  }

  return (
    <section className={styles.section}>
      {loading ? (
        <Loader />
      ) : !challenge ? (
        <p className={styles.infoMessage}>{"Aucun challenge trouvé..."}</p>
      ) : (
        <>
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
              </div>

              <div className={styles.ratingRow}>
                <div className={styles.starsGroup}>
                  <StarRating rating={challenge.averageChallengeScore} readOnly />
                </div>
                {isLoggedIn && (
                  <button
                    className={styles.rateButton}
                    onClick={() => {
                      if (!hasRatedChallenge) setShowRateChallenge(true)
                    }}
                    disabled={hasRatedChallenge}
                  >
                    {hasRatedChallenge ? "Déjà noté" : "Noter le challenge"}
                  </button>
                )}
              </div>

              <p className={styles.game}>{challenge.gameTitle}</p>

              <div className={styles.divider} />

              <div className={styles.descriptionBlock}>
                <p className={styles.descriptionLabel}>Description / règles</p>
                <textarea
                  className={styles.descriptionArea}
                  value={challenge.description}
                  readOnly
                  rows={4}
                />
              </div>

              <div className={styles.conditionsBlock}>
                <p className={styles.descriptionLabel}>Conditions</p>
                <textarea
                  className={styles.descriptionArea}
                  value={challenge.conditions}
                  readOnly
                  rows={3}
                />
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
            <div className={styles.completionsHeader}>
              <h2 className={styles.completionsTitle}>
                {challenge.participations.length
                  ? "Ils ont relevé le challenge !"
                  : "Sois le premier à relever ce challenge ! Prouve ta valeur, monte dans le classement."}
              </h2>

              {challenge.participations.length > 0 && (
                <div className={styles.desktopArrows}>
                  <button
                    className={styles.arrowBtn}
                    onClick={() => gridRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
                  >
                    ‹
                  </button>
                  <button
                    className={styles.arrowBtn}
                    onClick={() => gridRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            <div className={styles.completionsGrid} ref={gridRef}>
              {challenge.participations.map((participation) => (
                <ParticipationCard
                  key={participation.id}
                  participation={participation}
                  setParticipationToRate={
                    ratedParticipations[participation.id]
                      ? undefined
                      : setParticipationToRate
                  }
                />
              ))}
            </div>

            {challenge.participations.length > 1 && (
              <div className={styles.dots}>
                {challenge.participations.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                    onClick={() => goToIndex(i)}
                    aria-label={`Participation ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

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
              onRated={() => setHasRatedChallenge(true)}
            />
          )}

          {participationToRate !== null && (
            <RateParticipationModal
              participationId={participationToRate}
              onClose={() => setParticipationToRate(null)}
              userHasRated={ratedParticipations[participationToRate] === true}
              onRated={() => {
                setRatedParticipations((prev) => ({
                  ...prev,
                  [participationToRate]: true,
                }))
              }}
            />
          )}
        </>
      )}
    </section>
  )
}

export default ChallengeDetail