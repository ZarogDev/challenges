import React, { useEffect, useState } from "react";
import styles from "./Ranking.module.css";
import { useAuth } from "../context/AuthContext";
import Pagination from "./Pagination";

type Player = {
  rank: number;
  userId: number;
  username: string;
  totalScore: number;
  voteCount: number;
  averageScore: number;
};

// avatar style (comme avant)
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

// coupe la liste en 3 colonnes
const splitIntoColumns = (arr: Player[], cols: number) => {
  const perCol = Math.ceil(arr.length / cols);
  return Array.from({ length: cols }, (_, i) =>
    arr.slice(i * perCol, i * perCol + perCol)
  );
};

const Ranking: React.FC = () => {
  // joueurs du classement (plus de tableau en dur)
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoggedIn, username } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async (page: number) => {
      const url = new URL(`${import.meta.env.VITE_API_URL}/leaderboard`)
      url.searchParams.append("page", page.toString())
      url.searchParams.append("limit", "24")
      
      const res = await fetch(url.toString())

      if(!res.ok) throw new Error("Fetch failed");

      return await res.json()
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchLeaderboard(page);
        setPlayers(data.data);
        setTotalPages(data.totalPages);
      } catch {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // organisation en colonnes
  const columns = splitIntoColumns(players, 3);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Découvrez nos légendes, les meilleurs d&apos;entre nous !
      </h2>

      <div className={`${styles.leaderboard} neon-border-dual`}>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
        <h3 className={styles.title}>Classement des joueurs</h3>

        {loading && <p className={styles.infoMessage}>Chargement...</p>}
        {error && <p className={styles.infoMessage}>{error}</p>}

        {!loading && !error && (
          <div className={styles.columnsWrapper}>
            {columns.map((col, colIndex) => (
              <div key={colIndex} className={styles.column}>
                {col.map((p) => {
                  let rankClass = styles.rankOther;
                  if (p.rank === 1) rankClass = styles.rank1;
                  if (p.rank === 2) rankClass = styles.rank2;
                  if (p.rank === 3) rankClass = styles.rank3;

                  return (
                    <div key={p.userId} className={`${styles.listItem} ${isLoggedIn && username === p.username ? styles.activeUser : null}`}>
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
                        <span className={styles.score}>{p.totalScore} pts</span>

                        {/* infos en plus */}
                        <span className={styles.extraInfo}>
                          {p.voteCount} votes • moyenne {p.averageScore.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Ranking;