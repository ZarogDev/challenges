import { useState } from "react"
import styles from "./RateParticipationModal.module.css"
import StarRating from "./StarRating"

type Props = {
  participationId: number
  title?: string
  onClose: () => void
}

const RateParticipationModal: React.FC<Props> = ({
  participationId,
  title = "Noter la participation",
  onClose,
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
      await fetch(
        `${import.meta.env.VITE_API_URL}/participations/${participationId}/ratings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: value }),
        }
      )
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

export default RateParticipationModal
