import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function LoaderWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Petit délai pour éviter le setState synchrone
    const startTimer = setTimeout(() => {
      setIsLoading(true);
    }, 0);

    const stopTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [location.pathname]);

  if (!isLoading) return null;

  return <Loader />;
}