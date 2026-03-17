import styles from './Sponsor.module.css'
function Sponsor() {
    return(
        <section className={styles.sponsors}>
            <h3>Nos sponsors</h3>
            <div className={styles.sponsorLogos}>
                <span>NOVA EFORTE</span>
                <span>CYBER ARENA</span>
                <span>GEAR X</span> 
                <span>SURGE</span>
            </div>
        </section>
    )
}


export default Sponsor