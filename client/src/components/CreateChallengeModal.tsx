import { useEffect, useState } from "react"
import styles from "./CreateChallengeModal.module.css"

type CreateChallengeForm = {
  title: string
  description: string
  conditions: string
  gameId: number | null
}

type RawgGame = {
  id: number
  name: string
  background_image: string | null
}

type Props = {
  onClose: () => void
}

const CreateChallengeModal = ({ onClose }: Props) => {
  const [form, setForm] = useState<CreateChallengeForm>({
    title: "",
    description: "",
    conditions: "",
    gameId: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const [gameSearch, setGameSearch] = useState("")
  const [gameResults, setGameResults] = useState<RawgGame[]>([])
  const [gameLoading, setGameLoading] = useState(false)
  const [gameError, setGameError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (values: CreateChallengeForm) => {
    const errs: Record<string, string> = {}

    if (!values.title.trim()) {
      errs.title = "Le titre est obligatoire"
    }

    if (!values.description.trim()) {
      errs.description = "La description est obligatoire"
    }

    if (!values.gameId) {
      errs.gameId = "Vous devez choisir un jeu via la recherche"
    }

    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    setErrors({})

    try {
      // adapte l’URL à ton backend
      const res = await fetch("http://localhost:3000/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message || "Erreur lors de la création du challenge")
      }

      onClose()
    } catch (err) {
      setErrors({ global: (err as Error).message })
    } finally {
      setSubmitting(false)
    }
  }

  // Recherche de jeux RAWG
  useEffect(() => {
    if (gameSearch.trim().length < 2) {
      setGameResults([])
      setGameError(null)
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setGameLoading(true)
        setGameError(null)

        const res = await fetch(
          `https://api.rawg.io/api/games?search=${encodeURIComponent(
            gameSearch
          )}&page_size=5&key=${import.meta.env.VITE_RAWG_API_KEY}`
        )

        if (!res.ok) {
          throw new Error("Erreur lors de la recherche de jeux")
        }

        const data = await res.json()
        setGameResults(data.results || [])
      } catch (err) {
        setGameError((err as Error).message)
        setGameResults([])
      } finally {
        setGameLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [gameSearch])

  const handleSelectGame = (game: RawgGame) => {
    setForm((prev) => ({ ...prev, gameId: game.id }))
    setGameSearch(game.name)
    setGameResults([])
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Créer un challenge</h2>
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

          <div className={styles.field}>
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex : Gagner 3 matchs d'affilée"
            />
            {errors.title && (
              <p className={styles.error}>{errors.title}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Explique les règles du challenge…"
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="conditions">
              Conditions (optionnel)
            </label>
            <textarea
              id="conditions"
              name="conditions"
              value={form.conditions}
              onChange={handleChange}
              rows={3}
              placeholder="Ex : uniquement en classé, solo queue, etc."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="gameSearch">
              Jeu (RAWG)
            </label>
            <input
              id="gameSearch"
              value={gameSearch}
              onChange={(e) => setGameSearch(e.target.value)}
              placeholder="Rechercher un jeu…"
            />
            {errors.gameId && (
              <p className={styles.error}>{errors.gameId}</p>
            )}

            {gameLoading && (
              <p className={styles.helper}>Recherche…</p>
            )}
            {gameError && (
              <p className={styles.error}>{gameError}</p>
            )}

            {gameResults.length > 0 && (
              <ul className={styles.suggestions}>
                {gameResults.map((game) => (
                  <li
                    key={game.id}
                    className={styles.suggestionItem}
                    onClick={() => handleSelectGame(game)}
                  >
                    {game.background_image && (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className={styles.gameThumbnail}
                      />
                    )}
                    <span>{game.name}</span>
                  </li>
                ))}
              </ul>
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
              {submitting ? "Création…" : "Créer le challenge"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default CreateChallengeModal