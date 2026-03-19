import React from 'react';
import styles from './ChallengeCard.module.css';
import { Link } from 'react-router';
import type { Challenge } from '../@types';
import { getAvatarBorder, getAvatarColor, getInitialColor, getInitials } from '../lib/utils';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge
}) => {

  const avatarBg = getAvatarColor(challenge.creator.username);
  const avatarBorder = getAvatarBorder(challenge.creator.username);
  const avatarColor = getInitialColor(challenge.creator.username);

  return (
    <Link to={`/challenges/${challenge.id}`} className={`${styles.cardWrapper} neon-border-dual`}>
      <img src={challenge.gameThumbnail} alt={challenge.title} className={styles.cardImage} />
      <div className={styles.cardTitle}>{challenge.title}</div>
      <div className={styles.cardGameTitle}>{challenge.gameTitle}</div>
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
            {getInitials(challenge.creator.username)}
          </div>
          <span className={styles.creator}>Créé par {challenge.creator.username}</span>
        </div>

        <button className={styles.btnInscrire}>Participer</button>
      </div>
    </Link>
  );
};

export default ChallengeCard;
