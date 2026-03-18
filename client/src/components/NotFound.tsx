import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"

function NotFound() {
    return (
        <section className={styles.NotFound}>
            <h1 className={styles.title}>
                404 - Page introuvable
                </h1>
            <p className={styles.text}>
                Oups.. La page que tu cherche n'existe pas ou à été deplacée...
            </p>
            <Link to="/" className={styles.link}>
            Revenir à l'accueil
            </Link>
        </section>
    )
}

export default NotFound