import { useEffect, useState } from "react"
import ParticipationCard from "./ParticipationCard"
import styles from "./ProfilePage.module.css"
import { useAuth } from "../context/AuthContext";
import type { UserWithParticipations } from "../@types";

function Profile() {
    const [user, setUser] = useState<UserWithParticipations | undefined>(undefined);
    const { token } = useAuth();

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            // logique de gestion d'erreurs ici
            if(!response.ok) return;

            const data = await response.json();

            setUser(data);
            console.log(data);
        }

        fetchUser();
    }, [token]);

    return (
        <section className={styles.profile}>
            <div className={styles.header}>
                {/* <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className={styles.avatar}
                /> */}
           <div>
            <h1 className={styles.username}>{user?.username}</h1>
            <p className={styles.email}>{user?.email}</p>
            </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Rang</span>
                    {/* <span className={styles.statValue}>{user?.rank}</span> */}
                </div>
            </div>

            {/* Bouton centré, sans déconnexion */}
            <div className={styles.actions}>
                <button className={styles.primaryButton}>Modifier le profil</button>
            </div>

            {/* ── Bloc completions ── */}
            <div className={`${styles.completionsBlock} neon-border-dual`}>
                <h2 className={styles.completionsTitle}>
                Vos participations
                </h2>

                <div className={styles.completionsGrid}>
                {user?.participations.map((p) => (
                    <ParticipationCard key={p.id} participation={p}/>
                ))}
                </div>
            </div>
        </section>
    )
}

export default Profile
