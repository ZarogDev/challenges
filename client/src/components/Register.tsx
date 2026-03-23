import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidRegister } from "../lib/utils";

function Register() {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password_confirm:"",
        birthdate:"",
    });
    const [registerError, setRegisterError] = useState<string | string[] | null>(null);

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
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
            setRegisterError("Erreur lors de l'inscription");
            return;
        }

        navigate("/login");
    }

    const handleSubmit = async () => {
        const isValid = await isValidRegister(formData.username, formData.email, formData.password, formData.password_confirm, formData.birthdate);

        if (!isValid.valid) {
            setRegisterError(isValid.messages || "Données invalides");
            console.log(isValid.messages);
            return;
        }

        await registerUser();
    };

    return isLoggedIn ? <Navigate to="/" /> : (
        <div>
            <h1>Inscription</h1>
            <form action={handleSubmit}>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                    <input 
                    type="password"
                    id="confirmPassword"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    required
                    />
                    </div>

                <div>
                    <label htmlFor="birthdate">Date de naissance</label>
                    <input 
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                    />
                </div>

                {registerError && 
                registerError instanceof Array ? (
                    <ul>
                        {registerError.map((err, index) => (<li key={index}>{err}</li>))}
                    </ul>
                ) : (
                    <p>{registerError}</p>
                )}

                <button type="submit">S'inscrire</button>   
            </form>
            <p>
                Déja un compte ? <a href="/login">Se connecter</a>
            </p>
        </div>
    );
}

export default Register;