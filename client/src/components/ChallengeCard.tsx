import React from 'react';
import styles from './ChallengeCard.module.css';
import { Link } from 'react-router';
import type { Challenge } from '../@types';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge
}) => {
  return (
    <Link to={`/challenges/${challenge.id}`} className={`${styles.cardWrapper} neon-border-dual`}>
      <img src={challenge.gameThumbnail} alt={challenge.title} className={styles.cardImage} />
      <div className={styles.cardTitle}>{challenge.title}</div>
      <div className={styles.cardFooter}>

        {/* ✅ Avatar initiale + nom créateur
        <div className={styles.creatorRow}>
          <div
            className={styles.avatarInitial}
            style={{
              backgroundColor: avatarBg,
              border: `1px solid ${avatarBorder}`,
              color: avatarColor,
            }}
          >
            {getInitials(challenge.)}
          </div>
          <span className={styles.creator}>Créé par {creator}</span>
        </div> */}

        <button className={styles.btnInscrire}>S'inscrire</button>
      </div>
    </Link>
  );
};

export default ChallengeCard;
