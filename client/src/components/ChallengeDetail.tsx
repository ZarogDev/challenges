import React, { useEffect, useState } from 'react';
import styles from './ChallengeDetail.module.css';
import { getAvatarBorder, getAvatarColor, getInitialColor, getInitials } from '../lib/utils';
import { useParams } from 'react-router-dom';
import type { ChallengeWithParticipations } from '../@types';
import StarRating from './StarRating';

const ChallengeDetail: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeWithParticipations | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/challenges/${id}/participations`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenge');
        }
        const data: ChallengeWithParticipations = await response.json();
        setChallenge(data);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    }
    fetchChallenge();
  }, [id]);

  return challenge && (
    <section className={styles.section}>

      {/* ── Bloc principal : image + infos ── */}
      <div className={styles.detailBlock}>

        <img
          src={challenge.gameThumbnail}
          alt={challenge.gameTitle}
          className={styles.mainImage}
        />

        <div className={styles.infoBlock}>

          <div className={styles.titleRow}>
            <h1 className={styles.title}>{challenge.title}</h1>
            <StarRating rating={challenge.averageChallengeScore} />
          </div>

          <p className={styles.game}>{challenge.gameTitle}</p>

          <div className={styles.divider} />

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionLabel}>Description / règles</p>
            <p className={styles.description}>{challenge.description}</p>
          </div>

          <div className={styles.conditionsBlock}>
            <p className={styles.descriptionLabel}>Conditions</p>
            <p className={styles.description}>{challenge.conditions}</p>
          </div>

          <p className={styles.creator}>
            Challenge créé par :{' '}
            <span className={styles.creatorName}>{challenge.creator}</span>
          </p>

        </div>
      </div>

      {/* ── Bloc completions ── */}
      <div className={`${styles.completionsBlock} neon-border-dual`}>
        <h2 className={styles.completionsTitle}>Ils ont relevé le challenge !</h2>

        <div className={styles.completionsGrid}>
          {challenge.participations.map((c) => (
            <div key={c.id} className={`${styles.completionCard} neon-border-dual`}>

              {/* ✅ Avatar initiales à la place de l'image */}
              <div
                className={styles.avatarInitial}
                style={{
                  backgroundColor: getAvatarColor(c.participant),
                  border: `1px solid ${getAvatarBorder(c.participant)}`,
                  color: getInitialColor(c.participant),
                }}
              >
                {getInitials(c.participant)}
              </div>

              <div className={styles.cardContent}>
                <span className={styles.username}>{c.participant}</span>
                <p className={styles.comment}>{c.description}</p>
                <StarRating rating={c.averageParticipationScore} />
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ChallengeDetail;
