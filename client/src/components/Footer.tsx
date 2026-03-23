import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.bottomRow}>
        <a href="/mentions-legales" className={styles.link}>Mentions Légales</a>
        <span className={styles.separator}>-</span>
        <a href="/confidentialite" className={styles.link}>Politique de Confidentialité</a>
        <div className={styles.spacer} />
        <span className={styles.copyright}>Copyright 2026 GamerChallenges</span>
      </div>

      <div className={styles.bottomDecoration}>
        <svg
          className={styles.decorationSvg}
          preserveAspectRatio="none"
          viewBox="0 0 1500 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3A3A" />
              <stop offset="45%" stopColor="#FF3A3A" />
              <stop offset="55%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>

            {/* Dégradé vertical pour le remplissage intérieur */}
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3A3A" stopOpacity="0" />
              <stop offset="40%" stopColor="#FF3A3A" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#00D2FF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
            </linearGradient>

            <filter id="footerGlow" x="-10%" y="-200%" width="120%" height="600%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Remplissage dégradé rouge → bleu à l'intérieur du V */}
<path
  d="M 680 25 L 720 0 L 780 0 L 820 25 Z"
  fill="url(#fillGradient)"
/>

          {/* Ligne néon */}
          <path
            d="M 0 22 L 680 22 L 720 0 L 780 0 L 820 22 L 1500 22"
            fill="none"
            stroke="url(#footerGradient)"
            strokeWidth="2"
            strokeLinejoin="miter"
            filter="url(#footerGlow)"
          />
        </svg>

        <img
          src="/logo-manette.png"
          alt="manette"
          className={styles.controller}
        />
      </div>

    </footer>
  );
}
