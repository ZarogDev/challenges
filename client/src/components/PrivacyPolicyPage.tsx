import styles from "./LegalPage.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.heroBar}>
          <h1 className={styles.mainTitle}>Politique de Confidentialité</h1>
          <p className={styles.mainSubtitle}>
            GamerChallenges — Protection de vos données personnelles
          </p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>01</span>
              Introduction
            </h2>
            <p>
              La présente politique de confidentialité a pour objectif
              d&apos;informer les utilisateurs de la plateforme{" "}
              <strong className={styles.highlight}>GamerChallenges</strong> sur
              la manière dont leurs données personnelles sont collectées,
              utilisées et protégées.
            </p>
            <p>
              L&apos;éditeur s&apos;engage à respecter la réglementation en
              vigueur, notamment le Règlement Général sur la Protection des
              Données (RGPD).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>02</span>
              Données collectées
            </h2>
            <p>Les données suivantes peuvent être collectées :</p>

            <h3 className={styles.subTitle}>Données fournies par l&apos;utilisateur</h3>
            <ul className={styles.list}>
              <li>Adresse email</li>
              <li>Pseudonyme</li>
              <li>Mot de passe (chiffré)</li>
            </ul>

            <h3 className={styles.subTitle}>Données d&apos;utilisation</h3>
            <ul className={styles.list}>
              <li>Participations aux challenges</li>
              <li>Scores et classements</li>
              <li>Votes effectués</li>
              <li>Interactions sur la plateforme</li>
            </ul>

            <h3 className={styles.subTitle}>Données techniques</h3>
            <ul className={styles.list}>
              <li>Adresse IP</li>
              <li>Navigateur utilisé</li>
              <li>Type d&apos;appareil</li>
              <li>Données de connexion</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>03</span>
              Finalités du traitement
            </h2>
            <p>Les données sont collectées afin de :</p>
            <ul className={styles.list}>
              <li>Créer et gérer les comptes utilisateurs</li>
              <li>Permettre la participation aux challenges</li>
              <li>Afficher les classements et statistiques</li>
              <li>Améliorer la plateforme</li>
              <li>Assurer la sécurité du service</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>04</span>
              Base légale
            </h2>
            <p>Le traitement des données repose sur :</p>
            <ul className={styles.list}>
              <li>L&apos;exécution du contrat (utilisation de la plateforme)</li>
              <li>Le consentement (cookies, certaines fonctionnalités)</li>
              <li>L&apos;intérêt légitime (sécurité et amélioration du service)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>05</span>
              Durée de conservation
            </h2>
            <p>Les données sont conservées :</p>
            <ul className={styles.list}>
              <li>Pendant toute la durée d&apos;utilisation du compte</li>
              <li>Jusqu&apos;à suppression du compte par l&apos;utilisateur</li>
              <li>Plus longtemps si une obligation légale l&apos;exige</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>06</span>
              Sécurité
            </h2>
            <p>Des mesures techniques sont mises en place pour protéger les données :</p>
            <ul className={styles.list}>
              <li>Mots de passe hachés</li>
              <li>Authentification sécurisée (JWT)</li>
              <li>Protection contre les attaques (XSS, injections)</li>
              <li>Validation des données</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>07</span>
              Partage des données
            </h2>
            <p>
              Les données personnelles{" "}
              <strong className={styles.highlight}>ne sont pas vendues</strong>.
            </p>
            <p>Elles peuvent être partagées uniquement avec :</p>
            <ul className={styles.list}>
              <li>Les prestataires techniques (hébergement, infrastructure)</li>
              <li>Les autorités en cas d&apos;obligation légale</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>08</span>
              Contenus publics
            </h2>
            <p>Certains éléments sont publics sur la plateforme :</p>
            <ul className={styles.list}>
              <li>Pseudonyme</li>
              <li>Scores</li>
              <li>Participations</li>
              <li>Classements</li>
            </ul>
            <p>
              L&apos;utilisateur accepte que ces données soient visibles par
              les autres utilisateurs.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>09</span>
              Cookies
            </h2>
            <p>
              Le site utilise des cookies pour assurer le bon fonctionnement de
              la session utilisateur, améliorer l&apos;expérience et analyser
              l&apos;utilisation du site.
            </p>
            <p>
              L&apos;utilisateur peut configurer ses préférences via son navigateur.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>10</span>
              Droits des utilisateurs
            </h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className={styles.list}>
              <li>Droit d&apos;accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit d&apos;opposition</li>
              <li>Droit à la portabilité</li>
            </ul>
            <p>
              Pour exercer ces droits :{" "}
              <span className={styles.highlight}>[email de contact]</span>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>11</span>
              Mineurs
            </h2>
            <p>
              La plateforme est accessible à partir de{" "}
              <strong className={styles.highlight}>13 ans</strong>.
            </p>
            <p>
              Les mineurs doivent utiliser le service sous la responsabilité de
              leurs représentants légaux.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>12</span>
              Modifications
            </h2>
            <p>
              La présente politique de confidentialité peut être modifiée à tout moment.
            </p>
          </section>

          <section className={`${styles.section} ${styles.contactSection}`}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>13</span>
              Contact
            </h2>
            <p>Pour toute question relative à cette politique :</p>
            <div className={styles.contactBox}>
              <span>📧</span>
              <span>[Adresse e-mail de contact]</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}