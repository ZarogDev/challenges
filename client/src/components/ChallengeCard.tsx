import styles from './ChallengeCard.module.css'
type Props={
    title: string
    game: string
}
function ChallengeCard({title,game}: Props){
    return (
        <div className={styles.challengeCard}>
            <h3>{game}</h3>
            <p>{title}</p>
            <button>S'inscrire</button>
        </div>
    )
}

export default ChallengeCard