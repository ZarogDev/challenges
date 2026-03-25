import type { Participation } from "../@types";
import { useAuth } from "../context/AuthContext";
import { getEmbedUrl } from "../lib/utils";
import styles from "./ParticipationCard.module.css";
import StarRating from "./StarRating";

export default function ParticipationCard({participation, setParticipationToRate}: {participation: Participation, setParticipationToRate?: (id: number) => void}) {
  const { isLoggedIn } = useAuth();

  return (
    <div className={`${styles.completionCard} neon-border-dual`}>
      <iframe
        src={getEmbedUrl(participation.videoLink)}
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />

      <div className={styles.cardContent}>
        <span className={styles.username}>{participation.participant}</span>
        <p className={styles.comment}>{participation.description}</p>
        <StarRating
          rating={participation.averageParticipationScore}
          readOnly
        />
          {isLoggedIn && setParticipationToRate && (
            <button
              className={styles.rateButton}
              onClick={() => setParticipationToRate(participation.id)}
            >
              Noter cette participation
            </button>
          )}
    </div>
    </div>
  )
}