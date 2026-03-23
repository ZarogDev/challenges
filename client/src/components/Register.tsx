import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { isValidRegister } from "../lib/utils";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    birthdate: "",
  });
  const [error, setError] = useState<{
    [x: string]: string;
}[] | undefined>(undefined);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  };

  const handleSubmit = async () => {
    const isValid = await isValidRegister(formData.username, formData.email, formData.password, formData.password_confirm, formData.birthdate);

    if (!isValid.valid) {
      setError(isValid.messages || [{ global: "Données invalides" }]);

      return;
    }

    return await registerUser();
  };

  async function registerUser() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok) {
            setError([{ global: "Erreur lors de l'inscription" }]);
            return;
        }

        navigate("/login");
  }

  return isLoggedIn ? <Navigate to="/"/> : (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>

          {/* En-tête carte */}
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Inscription</h1>
            <p className={styles.subtitle}>Rejoins l'arène GamerChallenges</p>
          </div>

          {/* Formulaire */}
          <form action={handleSubmit} className={styles.form} noValidate>

            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ton pseudo (ex: Cybersniper)"
                className={`${styles.input} ${error?.find(err => err["username"]) ? styles.invalid : ""}`}
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
                className={`${styles.input} ${error?.find(err => err["email"]) ? styles.invalid : ""}`}
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
                  className={`${styles.input} ${error?.find(err => err["password"]) ? styles.invalid : ""}`}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="password_confirm" className={styles.label}>Confirmation</label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${styles.input} ${error?.find(err => err["password_confirm"]) ? styles.invalid : ""}`}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="birthdate" className={styles.label}>Date de naissance</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className={`${styles.input} ${error?.find(err => err["birthdate"]) ? styles.invalid : ""}`}
                required
              />
            </div>

            {error && (
              <div className={styles.errorBox}>
                {error.map((err, index) => (
                  <div className={styles.errorItem} key={index}>
                    <span>⚠</span> {Object.values(err)}
                  </div>
                ))}
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
  );
}

export default Register;
