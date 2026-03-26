import React, { useState, useEffect } from "react"
import styles from "./ChallengeList.module.css"
import ChallengeCard from "./ChallengeCard"
import type { Challenge } from "../@types"
import CreateChallengeModal from "./CreateChallengeModal"
import { useAuth } from "../context/AuthContext"
import Pagination from "./Pagination"

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const fetchChallenges = async (page: number, search: string) => {
      const url = new URL(`${import.meta.env.VITE_API_URL}/challenges`)
      url.searchParams.append("page", page.toString())
      url.searchParams.append("limit", "9")
      if (search) url.searchParams.append("search", search)
      const res = await fetch(url.toString())
      return await res.json()
    }

    async function fetchData() {
      setLoading(true)
      try {
        const data = await fetchChallenges(page, debouncedSearch)
        setChallenges(data.data)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, debouncedSearch])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Relève le défi, prouve ta valeur !
      </h2>

      {isLoggedIn && (
        <button
          className={styles.createButton}
          onClick={() => setShowCreateModal(true)}
        >
          Créer un challenge
        </button>
      )}

      {showCreateModal && (
        <CreateChallengeModal
          onClose={() => setShowCreateModal(false)}
        />
      )}

      <div className={`${styles.listContainer} neon-border-dual`}>

        {/* Header : pagination à gauche + recherche à droite */}
        <div className={styles.headerRow}>

          {/* Pagination — à gauche */}
          <div className={styles.paginationWrapper}>
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>

          {/* Recherche — à droite */}
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Recherche par titre ou jeu"
              className={styles.searchBar}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.grid}>
            {loading ? "Chargement..." : error ? error : challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChallengeList