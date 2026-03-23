import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import styles from "./Login.module.css";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggedIn, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await login(email, password);
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <>

      <div className={styles.pageWrapper}>
        <div className={styles.card}>

          {/* En-tête carte */}
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Connexion</h1>
            <p className={styles.subtitle}>Accédez à votre espace GamerChallenges</p>
          </div>

          {/* Formulaire */}
          <form action={handleSubmit} className={styles.form}>

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

            {error && (
              <div className={styles.errorBox}>
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" className={styles.btnSubmit}>
              Se connecter
            </button>

          </form>

          {/* Section Inscription / CTA Secondaire */}
          <div className={styles.registerSection}>
            <p className={styles.registerText}>Pas encore de compte ?</p>
            <Link to="/register" className={styles.btnSecondary}>
              S'inscrire
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;
