import React, { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";

// structure d'un joueur
type Player = {
  rank: number;
  userId: number;
  username: string;
  totalScore: number;
  voteCount: number;
  averageScore: number;
};

// structure de la réponse API
type LeaderboardApiResponse = {
  message: string;
  data: Player[];
};

// styles avatar (déjà présent avant)
const getAvatarBg = (name: string): string => {
  const colors = [
    "rgba(0, 212, 255, 0.15)",
    "rgba(255, 58, 58, 0.15)",
    "rgba(168, 85, 247, 0.15)",
    "rgba(255, 215, 0, 0.15)",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const getAvatarBorder = (name: string): string => {
  const borders = ["#00d4ff", "#ff3a3a", "#a855f7", "#FFD700"];
  return borders[name.charCodeAt(0) % borders.length];
};

const getAvatarColor = (name: string): string => {
  const textColors = ["#00d4ff", "#ff3a3a", "#a855f7", "#FFD700"];
  return textColors[name.charCodeAt(0) % textColors.length];
};

const Leaderboard: React.FC = () => {
  // liste des joueurs (remplace le tableau statique d'avant)
  const [players, setPlayers] = useState<Player[]>([]);

  // pour afficher "chargement"
  const [loading, setLoading] = useState(true);

  // pour afficher une erreur si besoin
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        // récupère l'URL du backend
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_URL}/leaderboard`);

        if (!response.ok) {
          throw new Error("fetch failed");
        }

        const result: LeaderboardApiResponse = await response.json();

        // on met les données du backend dans le state
        setPlayers(result.data);
      } catch (err) {
        console.error(err);
        setError("Erreur chargement");
      } finally {
        setLoading(false);
      }
    };

    // lancé quand le composant apparaît
    fetchLeaderboard();
  }, []);

  // on garde seulement les 5 premiers
  const topPlayers = players.slice(0, 5);

  return (
    <div className={`${styles.leaderboard} neon-border-dual`}>
      <h3 className={styles.title}>Les 5 meilleurs joueurs</h3>

      {loading && <p className={styles.infoMessage}>Chargement...</p>}
      {error && <p className={styles.infoMessage}>{error}</p>}

      {!loading && !error && (
        <div className={styles.list}>
          {topPlayers.map((p) => {
            let rankClass = styles.rankOther;
            if (p.rank === 1) rankClass = styles.rank1;
            if (p.rank === 2) rankClass = styles.rank2;
            if (p.rank === 3) rankClass = styles.rank3;

            return (
              <div key={p.userId} className={styles.listItem}>
                <div className={`${styles.rankBadge} ${rankClass}`}>
                  {p.rank}
                </div>

                <div
                  className={styles.avatarInitial}
                  style={{
                    backgroundColor: getAvatarBg(p.username),
                    border: `1px solid ${getAvatarBorder(p.username)}`,
                    color: getAvatarColor(p.username),
                  }}
                >
                  {p.username.charAt(0).toUpperCase()}
                </div>

                <div className={styles.userInfo}>
                  <span className={styles.username}>{p.username}</span>
                  {/* score venant du backend */}
                  <span className={styles.score}>{p.totalScore} pts</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;