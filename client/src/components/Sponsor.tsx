import styles from './Sponsor.module.css';

export default function Sponsor() {
  return (
    <section className={styles.sponsorSection}>
      <p className={styles.title}>Nos sponsors</p>
      <div className={styles.logos}>

        <div className={`${styles.logo} ${styles.nova}`}>
          <div className={styles.novaBox}>
            <span className={styles.novaStar}>★</span>
            <span className={styles.novaTop}>NOVA</span>
            <span className={styles.novaBottom}>EGFORTE</span>
          </div>
        </div>

        <div className={`${styles.logo} ${styles.cyber}`}>
          <svg className={styles.cyberIcon} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2L4 9v14c0 10 7.2 19.3 16 22 8.8-2.7 16-12 16-22V9L20 2z"
              fill="rgba(0,160,210,0.12)"
              stroke="#00a8d4"
              strokeWidth="2.5"
            />
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoName}>CYBER</span>
            <span className={styles.logoName}>ARINA</span>
          </div>
        </div>

        <div className={`${styles.logo} ${styles.gear}`}>
          <div className={styles.logoText}>
            <span className={styles.gearName}>GEAR X</span>
            <span className={styles.logoSub}>HIGH PERFORMANCE GEAR</span>
          </div>
        </div>

        <div className={`${styles.logo} ${styles.surge}`}>
          <div className={styles.logoText}>
            <span className={styles.surgeName}>SURGE</span>
            <span className={styles.logoSub}>ENERGY DRINK</span>
          </div>
        </div>

      </div>
    </section>
  );
}
