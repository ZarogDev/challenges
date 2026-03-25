import type { Participation } from "../@types";
import { getEmbedUrl } from "../lib/utils";
import styles from "./ParticipationCard.module.css";
import StarRating from "./StarRating";

export default function ParticipationCard({participation}: {participation: Participation}) {
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
        <StarRating rating={participation.averageParticipationScore} />
      </div>
    </div>
  )
}