import styles from './LegalPage.module.css';

export default function CGUPage() {
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>

          {/* En-tête de la page */}
          <div className={styles.heroBar}>
            <h1 className={styles.mainTitle}>Conditions Générales d'Utilisation</h1>
            <p className={styles.mainSubtitle}>GamerChallenges — Règles et fonctionnement de la plateforme</p>
          </div>

          <div className={styles.content}>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>01</span>
                Objet
              </h2>
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) définissent les règles d'utilisation de la plateforme <strong className={styles.highlight}>GamerChallenges</strong>.
              </p>
              <p>Toute utilisation du site implique l'acceptation des présentes conditions.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>02</span>
                Inscription
              </h2>
              <p>L'utilisateur peut créer un compte en fournissant :</p>
              <ul className={styles.list}>
                <li>Un email valide</li>
                <li>Un pseudonyme</li>
                <li>Un mot de passe sécurisé</li>
              </ul>
              <p>L'utilisateur est responsable de la confidentialité de ses identifiants et de toutes les activités réalisées avec son compte.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>03</span>
                Fonctionnalités
              </h2>
              <p>La plateforme permet de :</p>
              <ul className={styles.list}>
                <li>Créer des challenges</li>
                <li>Participer à des défis</li>
                <li>Publier des performances (scores, vidéos)</li>
                <li>Voter pour les challenges et participations</li>
                <li>Consulter des classements</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>04</span>
                Règles de conduite
              </h2>
              <p>L'utilisateur s'engage à :</p>
              <ul className={styles.list}>
                <li>Respecter les autres membres de la communauté</li>
                <li>Ne pas tricher ou falsifier ses performances</li>
                <li>Ne pas publier de contenu illégal, offensant ou inapproprié</li>
                <li>Ne pas usurper l'identité d'un tiers</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>05</span>
                Contenus utilisateurs
              </h2>
              <h3 className={styles.subTitle}>Responsabilité</h3>
              <p>Les contenus publiés (challenges, scores, vidéos, commentaires) sont sous la responsabilité de l'utilisateur.</p>
              
              <h3 className={styles.subTitle}>Licence accordée à la plateforme</h3>
              <p>En publiant du contenu, l'utilisateur autorise GamerChallenges à :</p>
              <ul className={styles.list}>
                <li>Afficher et diffuser le contenu sur la plateforme</li>
                <li>Promouvoir le contenu dans le cadre du service</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>06</span>
                Système de vote et classement
              </h2>
              <p>Les classements sont calculés automatiquement à partir des participations et votes.</p>
              <p>L'éditeur ne garantit pas :</p>
              <ul className={styles.list}>
                <li>L'exactitude absolue des scores</li>
                <li>L'absence de triche ou d'erreurs dans les participations</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>07</span>
                Modération
              </h2>
              <p>L'éditeur se réserve le droit de :</p>
              <ul className={styles.list}>
                <li>Supprimer un contenu inapproprié</li>
                <li>Suspendre ou supprimer un compte utilisateur</li>
                <li>Intervenir en cas de non-respect des CGU</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>08</span>
                Suspension et suppression de compte
              </h2>
              <p>L'utilisateur peut supprimer son compte à tout moment.</p>
              <p>L'éditeur peut suspendre ou supprimer un compte en cas de :</p>
              <ul className={styles.list}>
                <li>Comportement abusif ou frauduleux</li>
                <li>Violation des CGU</li>
                <li>Non-respect des règles de la communauté</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>09</span>
                Responsabilité
              </h2>
              <p>La plateforme est fournie "en l'état". L'éditeur ne peut être tenu responsable :</p>
              <ul className={styles.list}>
                <li>Des bugs, erreurs ou interruptions du service</li>
                <li>Des pertes de données ou de contenus utilisateurs</li>
                <li>Des comportements des autres utilisateurs</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>10</span>
                Propriété intellectuelle
              </h2>
              <p>Le site et l'ensemble de ses contenus (texte, images, logos, code) sont protégés par le droit de la propriété intellectuelle.</p>
              <p>Toute reproduction, modification ou exploitation sans autorisation est interdite.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>11</span>
                Services tiers
              </h2>
              <p>La plateforme peut intégrer des services externes (ex : YouTube). L'utilisateur accepte les conditions et politiques de ces services.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>12</span>
                Évolution du service
              </h2>
              <p>La plateforme peut évoluer à tout moment avec :</p>
              <ul className={styles.list}>
                <li>L'ajout de fonctionnalités</li>
                <li>La modification ou la suppression de services</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>13</span>
                Modification des CGU
              </h2>
              <p>Les présentes CGU peuvent être modifiées à tout moment. L'utilisateur est invité à les consulter régulièrement.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>14</span>
                Droit applicable
              </h2>
              <p>Les présentes CGU sont soumises au droit français.</p>
            </section>

            <section className={`${styles.section} ${styles.contactSection}`}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>15</span>
                Contact
              </h2>
              <p>Pour toute question relative aux CGU :</p>
              <div className={styles.contactBox}>
                <span>📧</span>
                <span>[Adresse e-mail de contact]</span>
              </div>
            </section>

          </div>
        </div>
      </div>

    </>
  );
}
