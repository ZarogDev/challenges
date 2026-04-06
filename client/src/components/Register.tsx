import { useState, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { isValidRegister } from "../lib/utils";

type FieldStatus = {
  valid: boolean;
  message: string;
};

type ValidationMap = {
  username: FieldStatus;
  email: FieldStatus;
  password: FieldStatus;
  password_confirm: FieldStatus;
  birthdate: FieldStatus;
  termsAccepted: FieldStatus;
};

const initialFormData = {
  username: "",
  email: "",
  password: "",
  password_confirm: "",
  birthdate: "",
  termsAccepted: false,
};

const strengthLabel = ["", "Faible", "Moyen", "Fort"] as const;
const strengthColor = ["", "#e74c3c", "#f39c12", "#27ae60"] as const;

function getPasswordStrength(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score as 0 | 1 | 2 | 3;
}

function validateFields(formData: typeof initialFormData): ValidationMap {
  const minAge = 13;

  const birthdateValid = (() => {
    if (!formData.birthdate) return false;
    const birth = new Date(formData.birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= minAge;
  })();

  return {
    username: {
      valid: formData.username.trim().length >= 3,
      message: "Au moins 3 caractères",
    },
    email: {
      valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: "Email invalide",
    },
    password: {
      valid: formData.password.length >= 8,
      message: "Au moins 8 caractères",
    },
    password_confirm: {
      valid:
        formData.password_confirm.length > 0 &&
        formData.password === formData.password_confirm,
      message: "Les mots de passe ne correspondent pas",
    },
    birthdate: {
      valid: birthdateValid,
      message: `Tu dois avoir au moins ${minAge} ans`,
    },
    termsAccepted: {
      valid: formData.termsAccepted,
      message: "Tu dois accepter les conditions pour continuer",
    },
  };
}

function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [error, setError] = useState<{ [x: string]: string }[] | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const validation = useMemo(() => validateFields(formData), [formData]);
  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const isFormGloballyValid = useMemo(
    () => Object.values(validation).every((field) => field.valid),
    [validation]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.currentTarget;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setTouchedFields((prev) => new Set(prev).add(name));
    setError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouchedFields(new Set(Object.keys(initialFormData)));

    const isValid = await isValidRegister(
      formData.username,
      formData.email,
      formData.password,
      formData.password_confirm,
      formData.birthdate
    );

    if (!validation.termsAccepted.valid) {
      setError([{ global: validation.termsAccepted.message }]);
      return;
    }

    if (!isValid.valid) {
      setError(isValid.messages || [{ global: "Données invalides" }]);
      return;
    }

    await registerUser();
  };

  async function registerUser() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      setError([{ global: "Erreur lors de l'inscription" }]);
      return;
    }

    navigate("/login");
  }

  const getIndicator = (field: keyof ValidationMap) => {
    if (!touchedFields.has(field)) return null;

    const { valid, message } = validation[field];

    return (
      <span
        className={`${styles.fieldIndicator} ${
          valid ? styles.indicatorValid : styles.indicatorInvalid
        }`}
        title={!valid ? message : ""}
        aria-label={valid ? "Valide" : message}
      >
        {valid ? "✓" : "✗"}
      </span>
    );
  };

  const getInputClass = (field: keyof ValidationMap) => {
    if (!touchedFields.has(field)) return styles.input;

    return `${styles.input} ${
      validation[field].valid ? styles.inputValid : styles.invalid
    }`;
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Inscription</h1>
          <p className={styles.subtitle}>Rejoins l'arène GamerChallenges</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="username" className={styles.label}>
              Nom d'utilisateur
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ton pseudo (ex: Cybersniper)"
                className={getInputClass("username")}
                required
              />
              {getIndicator("username")}
            </div>
            {touchedFields.has("username") && !validation.username.valid && (
              <span className={styles.fieldError}>
                {validation.username.message}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className={getInputClass("email")}
                required
              />
              {getIndicator("email")}
            </div>
            {touchedFields.has("email") && !validation.email.valid && (
              <span className={styles.fieldError}>
                {validation.email.message}
              </span>
            )}
          </div>

          <div className={styles.gridRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Mot de passe
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={getInputClass("password")}
                  required
                />
                {getIndicator("password")}
              </div>

              {formData.password && (
                <div
                  className={styles.strengthBar}
                  aria-label={`Force : ${strengthLabel[passwordStrength]}`}
                >
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${(passwordStrength / 3) * 100}%`,
                      backgroundColor: strengthColor[passwordStrength],
                    }}
                  />
                  <span
                    className={styles.strengthLabel}
                    style={{ color: strengthColor[passwordStrength] }}
                  >
                    {strengthLabel[passwordStrength]}
                  </span>
                </div>
              )}

              {touchedFields.has("password") && !validation.password.valid && (
                <span className={styles.fieldError}>
                  {validation.password.message}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password_confirm" className={styles.label}>
                Confirmation
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={getInputClass("password_confirm")}
                  required
                />
                {getIndicator("password_confirm")}
              </div>
              {touchedFields.has("password_confirm") &&
                !validation.password_confirm.valid && (
                  <span className={styles.fieldError}>
                    {validation.password_confirm.message}
                  </span>
                )}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="birthdate" className={styles.label}>
              Date de naissance
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className={getInputClass("birthdate")}
                required
              />
              {getIndicator("birthdate")}
            </div>
            {touchedFields.has("birthdate") && !validation.birthdate.valid && (
              <span className={styles.fieldError}>
                {validation.birthdate.message}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={styles.checkbox}
                required
              />

              <label htmlFor="termsAccepted" className={styles.checkboxText}>
                J&apos;ai lu et j&apos;accepte les{" "}
                <Link to="/cgu" className={styles.inlineLegalLink}>
                  conditions générales d&apos;utilisation (CGU)
                </Link>{" "}
                et la{" "}
                <Link
                  to="/politique-confidentialite"
                  className={styles.inlineLegalLink}
                >
                  politique de confidentialité
                </Link>
                .
              </label>
            </div>

            {touchedFields.has("termsAccepted") &&
              !validation.termsAccepted.valid && (
                <span className={styles.fieldError}>
                  {validation.termsAccepted.message}
                </span>
              )}
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

          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={!isFormGloballyValid}
          >
            S'inscrire
          </button>
        </form>

        <p className={styles.registerLink}>
          Déjà un compte ?{" "}
          <Link to="/login" className={styles.link}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;