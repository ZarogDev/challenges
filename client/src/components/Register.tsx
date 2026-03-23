import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";


function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Efface l'erreur quand on tape
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne sont pas identiques.");
      return;
    }
    console.log("Inscription :", formData);
    // Logique d'inscription ici
  };

  return (
    <>


      <div className={styles.pageWrapper}>
        <div className={styles.card}>

          {/* En-tête carte */}
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Inscription</h1>
            <p className={styles.subtitle}>Rejoins l'arène GamerChallenges</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username" // Ajout de name pour que handleChange fonctionne
                value={formData.username}
                onChange={handleChange}
                placeholder="Ton pseudo (ex: Cybersniper)"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className={styles.input}
                required
              />
            </div>

            {/* Grid pour mettre les deux mots de passe côte à côte sur PC */}
            <div className={styles.gridRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirmation</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="birthday" className={styles.label}>Date de naissance</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            {error && (
              <div className={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" className={styles.btnSubmit}>
              S'inscrire
            </button>

          </form>

          {/* Lien connexion */}
          <p className={styles.registerLink}>
            Déjà un compte ?{" "}
            <Link to="/login" className={styles.link}>Se connecter</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;
