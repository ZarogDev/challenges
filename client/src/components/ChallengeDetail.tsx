import React from 'react';
import styles from './ChallengeDetail.module.css';
import { Star } from 'lucide-react';

const challenge = {
  title: 'Challenge 4',
  description: 'Régies du challenge : Terminez le jeu en mode Survie le plus rapidement possible. Aucune triche autorisée, semence aléatoire. Chronomètre en temps réel. Le défi est chronométré de la première frappe de bloc à l\'ouverture du portail de l\'End. Bonne chance !',
  conditions: 'Doit être créatif',
  gameId: 104,
  gameTitle: 'We Are The Dwarves',
  gameThumbnail: 'https://images-ext-1.discordapp.net/external/tCXU7NFx0VOe784ZxaeUDwxx_Gp6tvZlWsFwZ6qzw4o/https/media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg?format=webp&width=2063&height=1160',
  creator: 'Gameone',
  rating: 4,
};

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

// ✅ Récupère les deux premières lettres du username
const getInitials = (username: string): string => {
  return username.charAt(0).toUpperCase();
};

// ✅ Couleur unique par username pour différencier les avatars
const getAvatarColor = (username: string): string => {
  const colors = [
    'rgba(0, 212, 255, 0.15)',   // cyan
    'rgba(255, 58, 58, 0.15)',   // rouge
    'rgba(168, 85, 247, 0.15)',  // violet
    'rgba(255, 215, 0, 0.15)',   // or
  ];
  const borderColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

const getAvatarBorder = (username: string): string => {
  const borderColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % borderColors.length;
  return borderColors[index];
};

const getInitialColor = (username: string): string => {
  const textColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % textColors.length;
  return textColors[index];
};

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
  return (
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
            <StarRating rating={challenge.rating} />
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
