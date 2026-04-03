import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderWrapper}>

        {/* Image de la manette */}
        <div className={styles.controllerContainer}>
          <img
            src="/loader-controller.png"
            alt="Chargement..."
            className={styles.controllerImage}
          />
        </div>

        {/* Texte "CHARGEMENT" lettre par lettre */}
        <div className={styles.loadingText}>
          {"CHARGEMENT".split("").map((letter, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </div>

        {/* Barre de progression */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>

      </div>
    </div>
  );
}