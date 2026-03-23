import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password_confirm:"",
        birthdate:"",
    });

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
            alert("Erreur lors de l'inscription");
            console.log(response);
            return;
        }

        navigate("/login");
    }

    const handleSubmit = async () => {
        if(formData.password !== formData.password_confirm) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        if(new Date(formData.birthdate) > new Date()) {
            alert("La date de naissance ne peut pas être dans le futur");
            return;
        }

        if(new Date().getFullYear() - new Date(formData.birthdate).getFullYear() < 15) {
            alert("Vous devez avoir au moins 15 ans pour vous inscrire");
            return;
        }

        if(!formData.email.includes("@")) {
            alert("Veuillez entrer une adresse email valide");
            return;
        }

        if(formData.password.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        if(formData.username.length < 3) {
            alert("Le nom d'utilisateur doit contenir au moins 3 caractères");
            return;
        }

        if(formData.username.length > 20) {
            alert("Le nom d'utilisateur ne peut pas dépasser 20 caractères");
            return;
        }

        if(formData.password.length > 50) {
            alert("Le mot de passe ne peut pas dépasser 50 caractères");
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
                        <button type="submit">S'inscrire</button>   
            </form>
            <p>
                Déja un compte ? <a href="/login">Se connecter</a>
            </p>
        </div>
    );
}

export default Register;