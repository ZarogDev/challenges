import styles from './Hero.module.css';
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className={styles.hero}>

      {/* Desktop uniquement */}
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Relevez les challenges<br />
          Devenez une légende
        </h1>
        <p className={styles.subtitle}>
          GamerChallenges : La plateforme ultime pour transformer vos skills en gloire<br />
          Challenges exclusifs. Votre voyage vers le sommet commence ici
        </p>
        <div className={styles.actions}>
          <Link to="/challenges" className={styles.btnPrimary}>Voir les challenges</Link>
          <Link to="/register" className={styles.btnSecondary}>Inscription</Link>
        </div>
      </div>

      {/* Mobile uniquement — image + texte + boutons en colonne */}
      <div className={styles.mobileWrapper}>
        <img src="/hero.png" alt="Hero" className={styles.mobileImage} />
        <div className={styles.mobileTextBlock}>
          <h1 className={styles.mobileTitle}>
            Relevez les challenges<br />
            Devenez une légende
          </h1>
          <p className={styles.mobileSubtitle}>
            GamerChallenges : La plateforme ultime pour transformer vos skills en gloire
            Challenges exclusifs. Votre voyage vers le sommet commence ici
          </p>
          <div className={styles.mobileActions}>
            <Link to="/challenges" className={styles.btnPrimary}>Voir les challenges</Link>
            <Link to="/register" className={styles.btnSecondary}>Inscription</Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
