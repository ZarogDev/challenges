import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>GamerChallenges</div>
      <nav>
        <h2 className={styles.navTitle}>GamerChallenges</h2>
        <ul className={styles.navlist}>
          <li className={styles.navItem}>
            <Link to="/">Accueil</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/challenges">Liste des Challenges</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/leaderboard">Classement</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.loginBtn}>Connexion</button>
    </header>
  )
}

export default Header