import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem('token');

      if(!localToken) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localToken}`
        }
      });

      // gestion d'erreurs à faire ici
      if(!response.ok) return;

      const data = await response.json();
      setUsername(data.username);
      setToken(localToken);
      setIsLoggedIn(true);
    }
    
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
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
        setIsLoggedIn(false);
        setToken(null);
        setUsername(null);
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