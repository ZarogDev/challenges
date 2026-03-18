import React from 'react';
import styles from './ChallengeCard.module.css';

interface ChallengeCardProps {
  image: string;
  title: string;
  creator: string;
  avatarInitial: string;
  avatarBg: string;
  avatarBorder: string;
  avatarColor: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  image,
  title,
  creator,
  avatarInitial,
  avatarBg,
  avatarBorder,
  avatarColor,
}) => {
  return (
    <div className={`${styles.cardWrapper} neon-border-dual`}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardFooter}>

        {/* ✅ Avatar initiale + nom créateur */}
        <div className={styles.creatorRow}>
          <div
            className={styles.avatarInitial}
            style={{
              backgroundColor: avatarBg,
              border: `1px solid ${avatarBorder}`,
              color: avatarColor,
            }}
          >
            {avatarInitial}
          </div>
          <span className={styles.creator}>Créé par {creator}</span>
        </div>

        <button className={styles.btnInscrire}>S'inscrire</button>
      </div>
    </div>
  );
};

export default ChallengeCard;
