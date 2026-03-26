import { useState } from "react"
import styles from "./RateChallengeModal.module.css"
import StarRating from "./StarRating"

type Props = {
  challengeId: number
  title?: string
  onClose: () => void
  onRated: () => void
}

const RateChallengeModal: React.FC<Props> = ({
  challengeId,
  title = "Noter le challenge",
  onClose,
  onRated,
}) => {
  const [value, setValue] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!value) {
      setError("Choisis une note avant de valider")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
  const token = localStorage.getItem("token");
  
  await fetch(`http://localhost:3000/api/challenges/${challengeId}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ rating: value }),
  });
      onRated()
      onClose()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className={styles.body}>
          <StarRating rating={value} onChange={setValue} readOnly={false} />
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onClose}
            disabled={submitting}
          >
            Annuler
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Envoi…" : "Valider la note"}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default RateChallengeModal