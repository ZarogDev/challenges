import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ChallengeList from "./components/ChallengeList";
import Leaderboard from "./components/Leaderboard";
import ChallengeDetail from "./components/ChallengeDetail";
import Ranking from "./components/Ranking";
import Footer from "./components/Footer";
import Sponsor from "./components/Sponsor";
import LegalPage from "./components/LegalPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import CGUPage from "./components/CGUPage";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import RecentChallenges from "./components/RecentChallenges";
import Profile from "./components/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import LoaderWrapper from "./components/LoarderWrapper";

function HomePage() {
  return (
    <>
      <Hero />
      <div className="dashboard-layout">
        <div className="left-panel">
          <RecentChallenges />
        </div>
        <div className="right-panel">
          <Leaderboard />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="sr-only">
        Aller au contenu principal
      </a>

      {/* Loader actif sur toutes les pages */}
      <LoaderWrapper />

      <Header />
      <ScrollToTop />

      <div className="app-container">
        <main id="main-content" className="main-content" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path="/leaderboard" element={<Ranking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/cgu" element={<CGUPage />} />
            <Route
              path="/politique-confidentialite"
              element={<PrivacyPolicyPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <Sponsor />
      <Footer />
    </div>
  );
}

export default App;