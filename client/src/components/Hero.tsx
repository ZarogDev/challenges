import styles from './Hero.module.css'
function Hero(){
    return(
        <section className={styles.hero}>
            <h1>Relevez les Challenges</h1>
            <h2>Devenez une légende</h2>

            <p>GamerChallenges : la plateforme ultime pour transformer vos skills en gloire. Challenges exclusifs. Votre voyage vers le sommet commence ici
            </p>
            <div className={styles.heroButtons}>
                <button className={styles.btnRlue}>Voir les Challenges</button>
                <button className={styles.btnRed}>Inscription</button>
            </div>
        </section>
    )
}
export default Hero