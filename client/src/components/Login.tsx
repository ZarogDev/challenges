import { useState } from "react";

function Login() {
    const[formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Connexion:", formData);
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
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
                </div>
    );
}

export default Login;