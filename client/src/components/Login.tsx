import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
    const[formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const { login, isLoggedIn, error } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await login(email, password);
    };

    return isLoggedIn ? <Navigate to="/" /> : (
        <div>
            <h1>Connexion</h1>

            <form action={handleSubmit}>
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

                <button type="submit">Se connecter</button>

            </form>
                
            <p>
                Pas encore de compte ? <a href="/register">S'inscrire</a>
            </p>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
    );
}

export default Login;