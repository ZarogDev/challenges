import React from 'react';
import styles from './Leaderboard.module.css';

const players = [
  { rank: 1, name: 'Cybersniper', gp: '35,400 GP', avatar: '/avatar1.png' },
  { rank: 2, name: 'ValorantQueen', gp: '31,500 GP', avatar: '/avatar2.png' },
  { rank: 3, name: 'ApexTitan', gp: '21,600 GP', avatar: '/avatar3.png' },
  { rank: 4, name: 'GGPoPraiker', gp: '31,500 GP', avatar: '/avatar4.png' },
  { rank: 5, name: 'ActraGamer', gp: '31,500 GP', avatar: '/avatar5.png' },
];

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
              <img src={p.avatar} alt={p.name} className={styles.avatar} />
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