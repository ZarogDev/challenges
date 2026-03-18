import React from 'react';
import styles from './ChallengeCard.module.css';

interface ChallengeCardProps {
  image: string;
  title: string;
  creator: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ image, title, creator }) => {
  return (
    <div className={`${styles.cardWrapper} neon-border-dual`}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardFooter}>
        <span className={styles.creator}>Créé par {creator}</span>
        <button className={styles.btnInscrire}>S'inscrire</button>
      </div>
    </div>
  );
};

export default ChallengeCard;