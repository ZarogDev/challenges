import { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import styles from './ChallengeList.module.css'
type Challenge = {
    id: number
    game: string
    title:string
    description: string
}
function ChallengeList() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/challenges")
      .then((response) => response.json())
      .then((data) => setChallenges(data))
  }, [])

  return (
    <section className="challenge-section">
        <h2>Challenges populaires</h2>
        <div className="challenge-grid">
            {challenges.map((challenge)=>(
                <ChallengeCard
                key={challenge.id}
                title={challenge.title}
                game={challenge.game}
                />
            ))}
        </div>
    </section>
  )
}

export default ChallengeList