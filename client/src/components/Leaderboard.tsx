import React from 'react';
import styles from './Leaderboard.module.css';

const players = [
  { rank: 1,  name: 'Cybersniper',   gp: '35,400 GP' },
  { rank: 2,  name: 'ValorantQueen', gp: '31,500 GP' },
  { rank: 3,  name: 'ApexTitan',     gp: '21,600 GP' },
  { rank: 4,  name: 'GGPoPraiker',   gp: '31,500 GP' },
  { rank: 5,  name: 'ActraGamer',    gp: '31,500 GP' },
];

// ✅ Même logique que ChallengeDetail et ChallengeCard
const getAvatarBg = (name: string): string => {
  const colors = [
    'rgba(0, 212, 255, 0.15)',
    'rgba(255, 58, 58, 0.15)',
    'rgba(168, 85, 247, 0.15)',
    'rgba(255, 215, 0, 0.15)',
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const getAvatarBorder = (name: string): string => {
  const borders = ['#00d4ff', '#ff3a3a', '#a855f7', '#FFD700'];
  return borders[name.charCodeAt(0) % borders.length];
};

const getAvatarColor = (name: string): string => {
  const textColors = ['#00d4ff', '#ff3a3a', '#a855f7', '#FFD700'];
  return textColors[name.charCodeAt(0) % textColors.length];
};

const Leaderboard: React.FC = () => {
  return (
    <div className={`${styles.leaderboard} neon-border-dual`}>
      <h3 className={styles.title}>Les 5 meilleurs joueurs</h3>
      <div className={styles.list}>
        {players.map((p) => {
          let rankClass = styles.rankOther;
          if (p.rank === 1) rankClass = styles.rank1;
          if (p.rank === 2) rankClass = styles.rank2;
          if (p.rank === 3) rankClass = styles.rank3;

          return (
            <div key={p.rank} className={styles.listItem}>
              <div className={`${styles.rankBadge} ${rankClass}`}>{p.rank}</div>

              {/* ✅ Avatar initiale à la place de l'image */}
              <div
                className={styles.avatarInitial}
                style={{
                  backgroundColor: getAvatarBg(p.name),
                  border: `1px solid ${getAvatarBorder(p.name)}`,
                  color: getAvatarColor(p.name),
                }}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>

              <div className={styles.userInfo}>
                <span className={styles.username}>{p.name}</span>
                <span className={styles.score}>{p.gp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
