import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import Leaderboard from './components/Leaderboard';
import Ranking from './components/Ranking';
import Footer from './components/Footer';
import Sponsor from './components/Sponsor';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <main className="main-content">
          <Routes>
            {/* page d'accueil */}
            <Route
              path="/"
              element={
                
                <>
                  <Hero />
              <div className="dashboard-layout">
              <div className="left-panel">
                <ChallengeList />
              </div>
              <div className="right-panel">
               <Leaderboard />
              </div>
            </div>
                </>
              }
            />

            {/* page liste de challenges */}
            <Route
              path="/challenges"
              element={
                <>
                  <ChallengeList />
                </>
              }
            />
              {/* page Détail d'un challenge */}
            <Route
              path="/challenges/:id"
              element={
                <>
                  <ChallengeDetail />
                </>
              }
            />

            {/* page leaderboard */}
            <Route
              path="/leaderboard"
              element={<Ranking />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={<p>Page introuvable</p>}
            />
          </Routes>
        </main>
        <Sponsor />
      </div>
      <Footer />
    </>
  );
};

export default App;