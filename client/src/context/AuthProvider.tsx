import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // les states sont initialisés directement avec le contenu du localStorage, pour éviter la déconnexion au rechargement de la page
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('user'));
  const [error, setError] = useState<string | null>(null);

  const localUser = localStorage.getItem('user');
  const localToken = localStorage.getItem('token');

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    if(!localUser || !localToken) {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setToken(data.token);
        setUsername(data.username);
        setError(null);

        localStorage.setItem('user', data.username);
        localStorage.setItem('token', data.token);
      } else {
        setError('Erreur de connexion ! Vérifiez vos identifiants.');
      }
    } else {
      setUsername(localUser);
      setToken(localToken);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername(null);
    setError(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return navigate("/");
  };

  const value = {
    isLoggedIn,
    token,
    username,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}