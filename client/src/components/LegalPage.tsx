import styles from './LegalPage.module.css';


export default function LegalPage() {
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>

          <div className={styles.heroBar}>
            <h1 className={styles.mainTitle}>Mentions Légales</h1>
            <p className={styles.mainSubtitle}>GamerChallenges — Informations légales et réglementaires</p>
          </div>

          <div className={styles.content}>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>01</span>
                Éditeur du site
              </h2>
              <p>Le site <strong className={styles.highlight}>GamerChallenges</strong> est édité par :</p>
              <ul className={styles.list}>
                <li><span className={styles.label}>Nom / Raison sociale</span> : [À compléter]</li>
                <li><span className={styles.label}>Statut juridique</span> : [Auto-entrepreneur / SAS / SARL / Association…]</li>
                <li><span className={styles.label}>Adresse du siège social</span> : [À compléter]</li>
                <li><span className={styles.label}>Adresse e-mail</span> : [À compléter]</li>
                <li><span className={styles.label}>Numéro SIRET</span> : [À compléter]</li>
                <li><span className={styles.label}>Directeur de la publication</span> : [Nom, prénom]</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>02</span>
                Hébergement
              </h2>
              <p>Le site est hébergé par :</p>
              <ul className={styles.list}>
                <li><span className={styles.label}>Nom de l'hébergeur</span> : [Ex : OVH, AWS, etc.]</li>
                <li><span className={styles.label}>Adresse</span> : [À compléter]</li>
                <li><span className={styles.label}>Site web</span> : [URL de l'hébergeur]</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>03</span>
                Présentation du service
              </h2>
              <p>Le site <strong className={styles.highlight}>GamerChallenges</strong> est une plateforme communautaire permettant aux utilisateurs de :</p>
              <ul className={styles.list}>
                <li>Créer et proposer des défis (challenges) autour de jeux vidéo</li>
                <li>Participer à des défis proposés par d'autres utilisateurs</li>
                <li>Soumettre leurs performances (scores, vidéos, résultats)</li>
                <li>Consulter des classements (leaderboards)</li>
                <li>Interagir avec la communauté (votes, participations)</li>
              </ul>
              <p>La plateforme s'adresse à un public large, incluant joueurs occasionnels, compétitifs et créateurs de contenu.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>04</span>
                Accès au site
              </h2>
              <p>Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.</p>
              <p>Certaines fonctionnalités (création de challenges, participation, votes) nécessitent la création d'un compte utilisateur.</p>
              <p>L'éditeur s'efforce d'assurer une accessibilité conforme aux standards du web (notamment WCAG), mais ne peut garantir une accessibilité permanente.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>05</span>
                Propriété intellectuelle
              </h2>
              <p>L'ensemble du site GamerChallenges (structure, textes, images, logo, code, base de données, etc.) est protégé par le droit de la propriété intellectuelle.</p>
              <p>Sauf mention contraire, ces éléments sont la propriété exclusive de l'éditeur.</p>
              <p>Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation préalable est interdite.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>06</span>
                Contenus générés par les utilisateurs
              </h2>
              <p>Les utilisateurs peuvent publier du contenu sur la plateforme, notamment :</p>
              <ul className={styles.list}>
                <li>Descriptions de challenges</li>
                <li>Résultats et scores</li>
                <li>Liens vers des vidéos (ex : YouTube)</li>
                <li>Commentaires et interactions</li>
              </ul>
              <h3 className={styles.subTitle}>Responsabilité</h3>
              <p>Les utilisateurs sont seuls responsables des contenus qu'ils publient.</p>
              <p>Ils s'engagent à ne pas publier de contenus illégaux, violents ou haineux, portant atteinte aux droits d'autrui ou contraires aux bonnes mœurs.</p>
              <h3 className={styles.subTitle}>Modération</h3>
              <p>L'éditeur se réserve le droit de supprimer tout contenu inapproprié, suspendre ou supprimer un compte utilisateur, et mettre en place un système de signalement.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>07</span>
                Données personnelles
              </h2>
              <p>Le site peut collecter des données personnelles lors de l'inscription (email, pseudonyme, mot de passe) et de l'utilisation de la plateforme.</p>
              <h3 className={styles.subTitle}>Sécurité</h3>
              <ul className={styles.list}>
                <li>Mécanismes d'authentification sécurisés (JWT)</li>
                <li>Hachage des mots de passe</li>
                <li>Protection contre les failles courantes (XSS, injections, etc.)</li>
              </ul>
              <h3 className={styles.subTitle}>Droits des utilisateurs (RGPD)</h3>
              <ul className={styles.list}>
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit de suppression</li>
                <li>Droit d'opposition</li>
              </ul>
              <p>Pour exercer ces droits : <span className={styles.highlight}>[email de contact]</span></p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>08</span>
                Cookies
              </h2>
              <p>Le site peut utiliser des cookies pour assurer le bon fonctionnement de la session, améliorer la navigation et analyser l'utilisation du site.</p>
              <p>L'utilisateur peut configurer ses préférences via son navigateur.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>09</span>
                Responsabilité
              </h2>
              <p>L'éditeur ne saurait être tenu responsable des erreurs ou interruptions du service, des pertes de données, des contenus publiés par les utilisateurs ou des performances déclarées dans les challenges.</p>
              <p>Les classements et scores sont fournis à titre indicatif dans un cadre ludique.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>10</span>
                Liens externes
              </h2>
              <p>Le site peut contenir des liens vers des sites externes (ex : YouTube). L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>11</span>
                Évolution des mentions légales
              </h2>
              <p>Les présentes mentions légales peuvent être modifiées à tout moment. Les utilisateurs sont invités à les consulter régulièrement.</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>12</span>
                Droit applicable
              </h2>
              <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux du ressort du siège social de l'éditeur.</p>
            </section>

            <section className={`${styles.section} ${styles.contactSection}`}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>13</span>
                Contact
              </h2>
              <p>Pour toute question relative au site ou à ces mentions légales :</p>
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
