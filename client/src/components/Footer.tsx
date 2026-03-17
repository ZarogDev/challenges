import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomRow}>
        <div className={styles.lineLeft} />

        <div className={styles.bottomLinks}>
          <a href="/mentions-legales" className={styles.link}>Mentions Légales</a>
          <span className={styles.separator}>•</span>
          <a href="/confidentialite" className={styles.link}>Politique de Confidentialité</a>
        </div>

        <img
          src="/logo-manette.png"
          alt="manette"
          width={48}
          height={48}
          className={styles.controller}
        />

        <span className={styles.copyright}>Copyright 2026 GamerChallenges</span>

        <div className={styles.lineRight} />
      </div>
    </footer>
  );
}
