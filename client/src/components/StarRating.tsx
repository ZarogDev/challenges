import { Star } from "lucide-react";
import styles from "./StarRating.module.css";

const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <div className={styles.stars}>
    {Array.from({ length: max }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#00d4ff' : 'none'}
        color={i < rating ? '#00d4ff' : '#555'}
      />
    ))}
  </div>
);

export default StarRating;