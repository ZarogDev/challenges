type Props={
    title: string
    game: string
}
function ChallengeCard({title,game}: Props){
    return (
        <div className="challenge-card">
            <h3>{game}</h3>
            <p>{title}</p>
            <button>S'inscrire</button>
        </div>
    )
}

export default ChallengeCard