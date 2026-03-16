import styles from './Header.module.css'


function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>GamerChallenges</div>
        <nav>
            <h2 className={styles.navTitle}>GamerChallenges</h2>
            <ul className={styles.navlist}>
                <li className={styles.navItem}>Accueil</li>
                <li className={styles.navItem}>Liste des Challenges</li>
                <li className={styles.navItem}>Classement</li>     
            </ul>
        </nav>
        <button className={styles.loginBtn}>Connexion</button>
        </header>
    )
}

export default Header