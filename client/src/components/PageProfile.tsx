import styles from "./ProfilPage.module.css"

type User = {
    username: string
    email: string
    avatarUrl: string
    points: number
}

const mockUser: User ={
    username: "GamerOne",
    email: "gamerone@example.com",
    avatarUrl: '/avatar-default.png',
    points:3000,
}


function Profile() {
    const user = mockUser

    return (
        <section className={styles.profile}>
            <div className={styles.header}>
                <img
                src={user.avatarUrl}
                alt={user.username}
                className={styles.avatar}
            />
           <div>
            <h1 className={styles.username}>{user.username}</h1>
            <p className={styles.email}>{user.email}</p>
            </div>
            </div>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Rang</span>
                    <span className={styles.statValue}>{user.rank}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.primaryButton}>Modifier le profil</button>
                <button className={styles.secondaryButton}>Déconnexion</button>
            </div>
        </section>
    )
}
export default Profile