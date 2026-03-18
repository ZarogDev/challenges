import React from 'react';
import styles from './Ranking.module.css';
import {
  User,
  UserRound,
  Sword,
  Shield,
  Crosshair,
  Zap,
  Skull,
  Ghost,
  Bot,
  Crown,
} from 'lucide-react';

const players = [
  { rank: 1,  name: 'Cybersniper',   gp: '35,400 GP', icon: <Crown size={20} color="#FFD700" /> },
  { rank: 2,  name: 'ValorantQueen', gp: '31,500 GP', icon: <Crosshair size={20} color="#C0C0C0" /> },
  { rank: 3,  name: 'ApexTitan',     gp: '21,600 GP', icon: <Sword size={20} color="#CD7F32" /> },
  { rank: 4,  name: 'GGPoPraiker',   gp: '19,800 GP', icon: <Shield size={20} color="#00d4ff" /> },
  { rank: 5,  name: 'ActraGamer',    gp: '18,200 GP', icon: <Zap size={20} color="#a855f7" /> },
  { rank: 6,  name: 'Anonymous',     gp: '17,500 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 7,  name: 'Anonymous',     gp: '16,900 GP', icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 8,  name: 'Anonymous',     gp: '16,200 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 9,  name: 'Anonymous',     gp: '15,800 GP', icon: <Ghost size={20} color="#ff3a3a" /> },
  { rank: 10, name: 'Anonymous',     gp: '15,400 GP', icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 11, name: 'Anonymous',     gp: '14,900 GP', icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 12, name: 'Anonymous',     gp: '14,500 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 13, name: 'Anonymous',     gp: '14,100 GP', icon: <Skull size={20} color="#ff3a3a" /> },
  { rank: 14, name: 'Anonymous',     gp: '13,800 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 15, name: 'Anonymous',     gp: '13,500 GP', icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 16, name: 'Anonymous',     gp: '13,200 GP', icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 17, name: 'Anonymous',     gp: '12,900 GP', icon: <User size={20} color="#ff3a3a" /> },
  { rank: 18, name: 'Anonymous',     gp: '12,600 GP', icon: <UserRound size={20} color="#00d4ff" /> },
  { rank: 19, name: 'Anonymous',     gp: '12,300 GP', icon: <Ghost size={20} color="#ff3a3a" /> },
  { rank: 20, name: 'Anonymous',     gp: '12,000 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 21, name: 'Anonymous',     gp: '11,800 GP', icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 22, name: 'Anonymous',     gp: '11,600 GP', icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 23, name: 'Anonymous',     gp: '11,400 GP', icon: <User size={20} color="#ff3a3a" /> },
  { rank: 24, name: 'Anonymous',     gp: '11,200 GP', icon: <UserRound size={20} color="#00d4ff" /> },
  { rank: 25, name: 'Anonymous',     gp: '11,000 GP', icon: <Skull size={20} color="#ff3a3a" /> },
  { rank: 26, name: 'Anonymous',     gp: '10,800 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 27, name: 'Anonymous',     gp: '10,600 GP', icon: <Ghost size={20} color="#ff3a3a" /> },
  { rank: 28, name: 'Anonymous',     gp: '10,400 GP', icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 29, name: 'Anonymous',     gp: '10,200 GP', icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 30, name: 'Anonymous',     gp: '10,000 GP', icon: <User size={20} color="#00d4ff" /> },
  { rank: 31, name: 'Anonymous',     gp: '9,800 GP',  icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 32, name: 'Anonymous',     gp: '9,600 GP',  icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 33, name: 'Anonymous',     gp: '9,400 GP',  icon: <User size={20} color="#ff3a3a" /> },
  { rank: 34, name: 'Anonymous',     gp: '9,200 GP',  icon: <Ghost size={20} color="#00d4ff" /> },
  { rank: 35, name: 'Anonymous',     gp: '9,000 GP',  icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 36, name: 'Anonymous',     gp: '8,800 GP',  icon: <User size={20} color="#00d4ff" /> },
  { rank: 37, name: 'Anonymous',     gp: '8,600 GP',  icon: <Skull size={20} color="#ff3a3a" /> },
  { rank: 38, name: 'Anonymous',     gp: '8,400 GP',  icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 39, name: 'Anonymous',     gp: '8,200 GP',  icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 40, name: 'Anonymous',     gp: '8,000 GP',  icon: <User size={20} color="#00d4ff" /> },
  { rank: 41, name: 'Anonymous',     gp: '7,800 GP',  icon: <Ghost size={20} color="#ff3a3a" /> },
  { rank: 42, name: 'Anonymous',     gp: '7,600 GP',  icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 43, name: 'Anonymous',     gp: '7,400 GP',  icon: <User size={20} color="#ff3a3a" /> },
  { rank: 44, name: 'Anonymous',     gp: '7,200 GP',  icon: <UserRound size={20} color="#00d4ff" /> },
  { rank: 45, name: 'Anonymous',     gp: '7,000 GP',  icon: <Skull size={20} color="#ff3a3a" /> },
  { rank: 46, name: 'Anonymous',     gp: '6,800 GP',  icon: <User size={20} color="#00d4ff" /> },
  { rank: 47, name: 'Anonymous',     gp: '6,600 GP',  icon: <Ghost size={20} color="#ff3a3a" /> },
  { rank: 48, name: 'Anonymous',     gp: '6,400 GP',  icon: <Bot size={20} color="#00d4ff" /> },
  { rank: 49, name: 'Anonymous',     gp: '6,200 GP',  icon: <UserRound size={20} color="#ff3a3a" /> },
  { rank: 50, name: 'Anonymous',     gp: '6,000 GP',  icon: <User size={20} color="#00d4ff" /> },
];

const splitIntoColumns = (arr: typeof players, cols: number) => {
  const perCol = Math.ceil(arr.length / cols);
  return Array.from({ length: cols }, (_, i) =>
    arr.slice(i * perCol, i * perCol + perCol)
  );
};

const Leaderboard: React.FC = () => {
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

                    {/* ✅ Icône dans un cercle à la place de l'image */}
                    <div className={styles.avatarIcon}>
                      {p.icon}
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

export default Leaderboard;