import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import styles from "./StarRating.module.css"

type StarRatingProps = {
  rating?: number          // moyenne actuelle (ex: 4.3)
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  max = 5,
  onChange,
  readOnly = false,
}) => {
  const [current, setCurrent] = useState(rating)
  const [hover, setHover] = useState<number | null>(null)

  // si la moyenne change (refetch), on met à jour l'affichage
  useEffect(() => {
    setCurrent(rating)
  }, [rating])

  const handleClick = (value: number) => {
    if (readOnly) return
    setCurrent(value)
    onChange?.(value)
  }

  const handleMouseEnter = (value: number) => {
    if (readOnly) return
    setHover(value)
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHover(null)
  }

  const displayed = hover ?? current

  return (
    <>
      <div className={styles.stars}>
        {Array.from({ length: max }, (_, i) => {
          const value = i + 1
          const active = value <= displayed
          return (
            <button
              key={value}
              type="button"
              className={styles.starButton}
              onClick={() => handleClick(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
              disabled={readOnly}
            >
              <Star
                size={16}
                fill={active ? "#00d4ff" : "none"}
                color={active ? "#00d4ff" : "#555"}
              />
            </button>
          )
        })}
      </div>

      {current > 0 && (
        <span className={styles.rating}>{current.toFixed(1)}</span>
      )}
    </>
  )
}

export default StarRating