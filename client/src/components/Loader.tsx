import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderWrapper}>

        <div className={styles.controllerContainer}>
          <img
            src="/loader-controller.png"
            alt="Chargement..."
            className={styles.controllerImage}
          />
        </div>

        <div className={styles.loadingText}>
          {"CHARGEMENT".split("").map((letter, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>

      </div>
    </div>
  );
}