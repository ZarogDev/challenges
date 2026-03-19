import React from 'react';
import styles from './Ranking.module.css';

const players = [
  { rank: 1,  name: 'Cybersniper',   gp: '35,400 GP' },
  { rank: 2,  name: 'ValorantQueen', gp: '31,500 GP' },
  { rank: 3,  name: 'ApexTitan',     gp: '21,600 GP' },
  { rank: 4,  name: 'GGPoPraiker',   gp: '19,800 GP' },
  { rank: 5,  name: 'ActraGamer',    gp: '18,200 GP' },
  { rank: 6,  name: 'Anonymous',     gp: '17,500 GP' },
  { rank: 7,  name: 'Anonymous',     gp: '16,900 GP' },
  { rank: 8,  name: 'Anonymous',     gp: '16,200 GP' },
  { rank: 9,  name: 'Anonymous',     gp: '15,800 GP' },
  { rank: 10, name: 'Anonymous',     gp: '15,400 GP' },
  { rank: 11, name: 'Anonymous',     gp: '14,900 GP' },
  { rank: 12, name: 'Anonymous',     gp: '14,500 GP' },
  { rank: 13, name: 'Anonymous',     gp: '14,100 GP' },
  { rank: 14, name: 'Anonymous',     gp: '13,800 GP' },
  { rank: 15, name: 'Anonymous',     gp: '13,500 GP' },
  { rank: 16, name: 'Anonymous',     gp: '13,200 GP' },
  { rank: 17, name: 'Anonymous',     gp: '12,900 GP' },
  { rank: 18, name: 'Anonymous',     gp: '12,600 GP' },
  { rank: 19, name: 'Anonymous',     gp: '12,300 GP' },
  { rank: 20, name: 'Anonymous',     gp: '12,000 GP' },
  { rank: 21, name: 'Anonymous',     gp: '11,800 GP' },
  { rank: 22, name: 'Anonymous',     gp: '11,600 GP' },
  { rank: 23, name: 'Anonymous',     gp: '11,400 GP' },
  { rank: 24, name: 'Anonymous',     gp: '11,200 GP' },
  { rank: 25, name: 'Anonymous',     gp: '11,000 GP' },
  { rank: 26, name: 'Anonymous',     gp: '10,800 GP' },
  { rank: 27, name: 'Anonymous',     gp: '10,600 GP' },
  { rank: 28, name: 'Anonymous',     gp: '10,400 GP' },
  { rank: 29, name: 'Anonymous',     gp: '10,200 GP' },
  { rank: 30, name: 'Anonymous',     gp: '10,000 GP' },
  { rank: 31, name: 'Anonymous',     gp: '9,800 GP'  },
  { rank: 32, name: 'Anonymous',     gp: '9,600 GP'  },
  { rank: 33, name: 'Anonymous',     gp: '9,400 GP'  },
  { rank: 34, name: 'Anonymous',     gp: '9,200 GP'  },
  { rank: 35, name: 'Anonymous',     gp: '9,000 GP'  },
  { rank: 36, name: 'Anonymous',     gp: '8,800 GP'  },
  { rank: 37, name: 'Anonymous',     gp: '8,600 GP'  },
  { rank: 38, name: 'Anonymous',     gp: '8,400 GP'  },
  { rank: 39, name: 'Anonymous',     gp: '8,200 GP'  },
  { rank: 40, name: 'Anonymous',     gp: '8,000 GP'  },
  { rank: 41, name: 'Anonymous',     gp: '7,800 GP'  },
  { rank: 42, name: 'Anonymous',     gp: '7,600 GP'  },
  { rank: 43, name: 'Anonymous',     gp: '7,400 GP'  },
  { rank: 44, name: 'Anonymous',     gp: '7,200 GP'  },
  { rank: 45, name: 'Anonymous',     gp: '7,000 GP'  },
  { rank: 46, name: 'Anonymous',     gp: '6,800 GP'  },
  { rank: 47, name: 'Anonymous',     gp: '6,600 GP'  },
  { rank: 48, name: 'Anonymous',     gp: '6,400 GP'  },
  { rank: 49, name: 'Anonymous',     gp: '6,200 GP'  },
  { rank: 50, name: 'Anonymous',     gp: '6,000 GP'  },
];

// ✅ Même logique que tous les autres composants
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

const splitIntoColumns = (arr: typeof players, cols: number) => {
  const perCol = Math.ceil(arr.length / cols);
  return Array.from({ length: cols }, (_, i) =>
    arr.slice(i * perCol, i * perCol + perCol)
  );
};

const Ranking: React.FC = () => {
  const columns = splitIntoColumns(players, 3);

  return (
    <section className={styles.section}>

      <h2 className={styles.sectionTitle}>
        Découvrez nos légendes, les meilleurs d'entre nous !
      </h2>

      <div className={`${styles.leaderboard} neon-border-dual`}>
        <h3 className={styles.title}>Classement des joueurs</h3>

        <div className={styles.columnsWrapper}>
          {columns.map((col, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {col.map((p) => {
                let rankClass = styles.rankOther;
                if (p.rank === 1) rankClass = styles.rank1;
                if (p.rank === 2) rankClass = styles.rank2;
                if (p.rank === 3) rankClass = styles.rank3;

                return (
                  <div key={p.rank} className={styles.listItem}>
                    <div className={`${styles.rankBadge} ${rankClass}`}>{p.rank}</div>

                    {/* ✅ Première lettre du nom */}
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
                      <span className={`${styles.username} ${p.name === 'Anonymous' ? styles.anonymous : ''}`}>
                        {p.name}
                      </span>
                      <span className={styles.score}>{p.gp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Ranking;
