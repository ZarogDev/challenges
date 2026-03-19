import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const localUser = localStorage.getItem('user');
  const localToken = localStorage.getItem('token');

  // useEffect(() => {
  //   if(localUser && localToken) {
  //     setUsername(localUser);
  //     setToken(localToken);
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const login = async (email: string, password: string) => {
    if(!localUser || !localToken) {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setToken(data.token);
        setUsername(data.pseudo);
        setError(null); // pour supprimer du state une éventuelle erreur précédente

        localStorage.setItem('user', data.pseudo);
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