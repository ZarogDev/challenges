import { Star } from "lucide-react";
import styles from "./StarRating.module.css";

const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <>
  <div className={styles.stars}>
    {Array.from({ length: max }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.round(rating) ? '#00d4ff' : 'none'}
        color={i < Math.round(rating) ? '#00d4ff' : '#555'}
      />
    ))}
  </div>

  <span className={styles.rating}>{rating.toFixed(1)}</span>
  </>
);

export default StarRating;