import { useState } from "react"
import styles from "./RateParticipationModal.module.css"
import StarRating from "./StarRating"

type Props = {
  participationId: number
  title?: string
  onClose: () => void
  userHasRated?: boolean
  onRated?: () => void
}

const RateParticipationModal: React.FC<Props> = ({
  participationId,
  title = "Noter la participation",
  onClose,
  userHasRated = false,
  onRated,
}) => {
  const [value, setValue] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (userHasRated) {
      setError("Tu as déjà noté cette participation.")
      return
    }

    if (!value) {
      setError("Choisis une note avant de valider")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(
        `http://localhost:3000/api/participations/${participationId}/votes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: value }),
        }
      )

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        if (res.status === 409 || data?.message === "ALREADY_RATED") {
          setError("Tu as déjà noté cette participation.")
          return
        }

        throw new Error(data?.message || "Une erreur est survenue")
      }

      onRated?.()
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
            disabled={submitting}
          >
            ✕
          </button>
        </header>

        <div className={styles.body}>
          <StarRating rating={value} onChange={setValue} readOnly={false} />
          {userHasRated && !error && (
            <p className={styles.info}>
              Tu as déjà noté cette participation, tu ne peux pas voter à
              nouveau.
            </p>
          )}
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
            disabled={submitting || userHasRated}
          >
            {submitting ? "Envoi…" : "Valider la note"}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default RateParticipationModal