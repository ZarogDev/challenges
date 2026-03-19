import React, { useEffect, useState } from 'react';
import styles from './ChallengeDetail.module.css';
import { Star } from 'lucide-react';
import { getAvatarBorder, getAvatarColor, getInitialColor, getInitials } from '../lib/utils';
import { useParams } from 'react-router-dom';
import type { ChallengeWithParticipations } from '../@types';

const completions = [
  {
    id: 1,
    username: 'SteveSpeedy',
    comment: "Temps de 1h23min ! Incroyable défi, j'ai eu de la chance sur le portail de l'End.",
    rating: 5,
  },
  {
    id: 2,
    username: 'DiamondDigger',
    comment: "C'était difficile ! Je dois m'entraîner sur mes départs de mines.",
    rating: 4,
  },
  {
    id: 3,
    username: 'CreeperCrusher',
    comment: "Première tentative réussie en 3 heures. J'ai eu peur des creepers tout le temps.",
    rating: 3,
  },
  {
    id: 4,
    username: 'RedstoneRich',
    comment: "J'ai passé trop de temps à construire ma ferme, j'ai raté le chronomètre. Mais j'adore le défi !",
    rating: 3,
  },
];

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

const ChallengeDetail: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeWithParticipations | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges/${id}/participations`);
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
          {completions.map((c) => (
            <div key={c.id} className={`${styles.completionCard} neon-border-dual`}>

              {/* ✅ Avatar initiales à la place de l'image */}
              <div
                className={styles.avatarInitial}
                style={{
                  backgroundColor: getAvatarColor(c.username),
                  border: `1px solid ${getAvatarBorder(c.username)}`,
                  color: getInitialColor(c.username),
                }}
              >
                {getInitials(c.username)}
              </div>

              <div className={styles.cardContent}>
                <span className={styles.username}>{c.username}</span>
                <p className={styles.comment}>{c.comment}</p>
                <StarRating rating={c.rating} />
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ChallengeDetail;
