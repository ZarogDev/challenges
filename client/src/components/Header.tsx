import React from 'react';
import styles from './Header.module.css';
import { NavLink } from "react-router-dom"

const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="GamerChallenges Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" className={`${styles.navLink} `}>Accueil</NavLink>
          <NavLink to="/challenges" className={styles.navLink}>Liste des challenges</NavLink>
          <NavLink to="/leaderboard" className={styles.navLink}>Classement</NavLink>
        </nav>

        <button className={styles.btnConnexion}>
          Connexion
        </button>
      </header>

      <svg className={styles.bottomBorderSvg} preserveAspectRatio="none" viewBox="0 0 1500 35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3A3A" />
            <stop offset="15%" stopColor="#FF3A3A" />
            <stop offset="35%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path d="M 0 0 L 1500 0 L 1500 5 L 390 5 Q 370 5, 355 10 L 345 20 Q 330 30, 310 30 L 0 30 Z"
              fill="var(--panel-bg)" />

        <path d="M 0 30 L 310 30 Q 330 30, 345 20 L 355 10 Q 370 5, 390 5 L 1500 5"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2.5"
              filter="url(#glow)" />
      </svg>
    </div>
  );
};

export default Header;