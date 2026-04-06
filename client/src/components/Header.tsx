import React, { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Fermer le menu avec Echap
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, handleKeyDown]);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link to="/" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="GamerChallenges, retour à l'accueil"
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Nav desktop */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/challenges"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Liste des challenges
          </NavLink>
          <NavLink
            to="/leaderboard"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Classement
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Mon profil
            </NavLink>
          )}
        </nav>

        {/* Bouton connexion desktop */}
        <div className={styles.authDesktop}>
          {isLoggedIn ? (
            <button
              type="button"
              className={styles.btnConnexion}
              onClick={logout}
            >
              Déconnexion
            </button>
          ) : (
            <Link className={styles.btnConnexion} to="/login">
              Connexion
            </Link>
          )}
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

       {/* SVG desktop */}
      <svg
        className={styles.bottomBorderSvg}
        preserveAspectRatio="none"
        viewBox="0 0 1500 35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3A3A" />
            <stop offset="15%" stopColor="#FF3A3A" />
            <stop offset="35%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          d="M 0 0 L 1500 0 L 1500 5 L 390 5 Q 370 5, 355 10 L 345 20 Q 330 30, 310 30 L 0 30 Z"
          fill="var(--panel-bg)"
        />
        <path
          d="M 0 30 L 310 30 Q 330 30, 345 20 L 355 10 Q 370 5, 390 5 L 1500 5"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="2.5"
          filter="url(#glow)"
        />
      </svg>

      {/* Menu mobile plein écran */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Navigation principale mobile"
      >
        {/* SVG dans le menu */}
        <svg
          className={styles.menuSvg}
          preserveAspectRatio="none"
          viewBox="0 0 1500 35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonGradientMenu" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3A3A" />
              <stop offset="15%" stopColor="#FF3A3A" />
              <stop offset="35%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <filter id="glowMenu" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M 0 0 L 1500 0 L 1500 5 L 390 5 Q 370 5, 355 10 L 345 20 Q 330 30, 310 30 L 0 30 Z"
            fill="var(--panel-bg)"
          />
          <path
            d="M 0 30 L 310 30 Q 330 30, 345 20 L 355 10 Q 370 5, 390 5 L 1500 5"
            fill="none"
            stroke="url(#neonGradientMenu)"
            strokeWidth="2.5"
            filter="url(#glowMenu)"
          />
        </svg>

        {/* Liens mobile */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
          }
          onClick={closeMenu}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/challenges"
          end
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
          }
          onClick={closeMenu}
        >
          Liste des challenges
        </NavLink>
        <NavLink
          to="/leaderboard"
          end
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
          }
          onClick={closeMenu}
        >
          Classement
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
            }
            onClick={closeMenu}
          >
            Mon profil
          </NavLink>
        )}

        {/* Bouton poussé en bas */}
        <div className={styles.mobileBottom}>
          <div className={styles.mobileDivider} />
          {isLoggedIn ? (
            <button
              type="button"
              className={styles.mobileBtnConnexion}
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Déconnexion
            </button>
          ) : (
            <Link
              to="/login"
              className={styles.mobileBtnConnexion}
              onClick={closeMenu}
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;