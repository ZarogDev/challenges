import { useEffect, useState, useRef } from "react"
import ParticipationCard from "./ParticipationCard"
import styles from "./ProfilePage.module.css"
import { useAuth } from "../context/AuthContext";
import type { UserWithParticipations } from "../@types";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState<UserWithParticipations | undefined>(undefined);
    const { token } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) return;
            const data = await response.json();
            setUser(data);
        }
        fetchUser();
    }, [token]);

    /* Détecte la card visible au scroll */
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const handleScroll = () => {
            const cardWidth = grid.offsetWidth * 0.85 + 12;
            const index = Math.round(grid.scrollLeft / cardWidth);
            setActiveIndex(index);
        };

        grid.addEventListener("scroll", handleScroll, { passive: true });
        return () => grid.removeEventListener("scroll", handleScroll);
    }, [user]);

    /* Clic sur un point → scroll vers la card */
    const goToIndex = (index: number) => {
        const grid = gridRef.current;
        if (!grid) return;
        const cardWidth = grid.offsetWidth * 0.85 + 12;
        grid.scrollTo({ left: index * cardWidth, behavior: "smooth" });
        setActiveIndex(index);
    };

    return (
        <section className={styles.profile}>
            <div className={styles.header}>
                <div className={styles.avatarInitial}>
                    {user?.username?.charAt(0).toUpperCase() ?? '?'}
                </div>
                <div className={styles.userInfo}>
                    <h1 className={styles.username}>{user?.username}</h1>
                    <p className={styles.email}>{user?.email}</p>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>{user?.rank ? `Rang: ${user.rank}` : "Pas encore classé ? Commencez à participer afin de grimper dans le classement et voir votre évolution !"}</span>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.primaryButton}>Modifier le profil</button>
            </div>

            <div className={`${styles.completionsBlock} neon-border-dual`}>

                {/* Header titre + flèches desktop */}
                <div className={styles.completionsHeader}>
                    <h2 className={styles.completionsTitle}>{user?.participations.length ? "Vos participations" : "Lancez-vous ! Participez à un challenge"}</h2>
                    {user?.participations.length ? (
                        <div className={styles.desktopArrows}>
                        <button
                            className={styles.arrowBtn}
                            onClick={() => {
                                const grid = gridRef.current;
                                if (grid) grid.scrollBy({ left: -400, behavior: 'smooth' });
                            }}
                        >
                            ‹
                        </button>
                        <button
                            className={styles.arrowBtn}
                            onClick={() => {
                                const grid = gridRef.current;
                                if (grid) grid.scrollBy({ left: 400, behavior: 'smooth' });
                            }}
                        >
                            ›
                        </button>
                    </div>
                    ) : null}
                </div>

                {/* Grid scrollable */}
                <div className={styles.completionsGrid} ref={gridRef}>
                    {user?.participations.length ? user.participations.map((p) => (
                        <ParticipationCard key={p.id} participation={p} />
                    )) : (
                        <Link to="/challenges" className={styles.btnPrimary}>Voir les challenges</Link>
                    )}
                </div>

                {/* Points pagination — mobile uniquement */}
                {user?.participations && user.participations.length > 1 && (
                    <div className={styles.dots}>
                        {user.participations.map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                                onClick={() => goToIndex(i)}
                                aria-label={`Participation ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Profile
