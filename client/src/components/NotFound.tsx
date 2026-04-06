import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";


function NotFound() {
  return (
    <>


      <div className={styles.pageWrapper}>
        <div className={styles.card}>

          {/* Image gaming */}
          <div className={styles.imageWrapper}>
            <img src="/404.webp" alt="404 Zone inexistante" className={styles.image} />
            <div className={styles.imageFadeBottom} />
          </div>

          {/* Contenu */}
          <div className={styles.content}>
            <h1 className={styles.title}>Page Introuvable</h1>
            <p className={styles.text}>
              Oups… La page que tu cherches n'existe pas ou a été déplacée.<br />
              Retourne à l'accueil et reprends la partie !
            </p>
            <Link to="/" className={styles.btnHome}>
              ← Retour à l'accueil
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default NotFound;
