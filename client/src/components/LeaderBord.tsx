import { useEffect, useState } from "react";

type Player = {
    id: number
    username: string
    score: number
}

function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/leaderboard")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
  }, []) 
  
  return(
    <aside className="leaderboard">
        <h3>Les 5 meilleurs joueurs</h3>
        <ol>
            {players.map((player)=>(
                <li key={player.id}>
                    {player.username}- {player.score} GP
                </li>
            ))}
        </ol>
    </aside>
  )
}

export default Leaderboard