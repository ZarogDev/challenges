import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        birthday:"",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne sont pas indentiques.");
            return;
        }
        console.log("Inscription :", formData);
    };
    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                    type="text"
                    id="username"
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    />
                    </div>

                <div>
                    <label htmlFor="birthday">Date de naissance</label>
                    <input 
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
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