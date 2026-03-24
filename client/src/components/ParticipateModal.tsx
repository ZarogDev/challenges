import { useState } from "react";
import styles from "./ParticipateModal.module.css"


type Props = {
    challengeId: number 
    onClose: () => void
}

const isYoutubeUrl = (url: string) => {
    if (!url) return false
    const regExp= 
     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/
     return regExp.test(url)
}

const ParticipateModal = ({ challengeId, onClose}: Props) => {
    const[description, setDescription]= useState("")
    const[videoUrl, setVideoUrl]= useState("")
    const[errors,setErrors]= useState<Record<string,string>>({})
    const[submitting, setSubmitting]= useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> ={}

        if (!description.trim()) {
            newErrors.description = "La description est obligatoire"
        }
        if (!videoUrl.trim()) {
            newErrors.videoUrl = "Le lien de la vidéo est obligatoire"
        } else if (!isYoutubeUrl(videoUrl.trim())) {
            newErrors.videoUrl = "Le lien doit etre une URL youtube valide"
        }
        setSubmitting(true)
        setErrors({})

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/challenges/${challengeId}/participations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: description.trim(),
            videoUrl: videoUrl.trim(),
          }),
          credentials: "include",
        }
            )
        if (!res.ok) {
            const body = await res.json().catch(() => null)
            throw new Error(body?.message || "Erreur lors de l'envoie de la participation")
        }

        onClose()
        } catch (err) {setErrors({global: (err as Error).message})
    } finally {
        setSubmitting(false)
    }
    }
    return (
        <div className={styles.backdrop}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Participer au challenge</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.global && (
            <p className={styles.errorGlobal}>{errors.global}</p>
          )}

          <p className={styles.disclaimer}>
            Seules les vidéos hébergées sur <strong>YouTube</strong> sont acceptées.
          </p>

          <div className={styles.field}>
            <label htmlFor="description">Description de ta participation</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Explique comment tu as relevé le challenge…"
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="videoUrl">Lien de la vidéo YouTube</label>
            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
            />
            {errors.videoUrl && (
              <p className={styles.error}>{errors.videoUrl}</p>
            )}
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
              type="submit"
              className={styles.primaryButton}
              disabled={submitting}
            >
              {submitting ? "Envoi…" : "Envoyer la participation"}
            </button>
          </footer>
        </form>
      </div>
    </div>
    )
}

export default ParticipateModal