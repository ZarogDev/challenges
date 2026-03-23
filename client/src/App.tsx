import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ChallengeList from './components/ChallengeList';
import Leaderboard from './components/Leaderboard';
import ChallengeDetail from "./components/ChallengeDetail";
import Ranking from './components/Ranking';
import Footer from './components/Footer';
import Sponsor from './components/Sponsor';
import LegalPage from './components/LegalPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import CGUPage from './components/CGUPage';
import { Routes, Route } from "react-router-dom"
import NotFound from "./components/NotFound"
import Login from './components/Login';
import Register from './components/Register';
import RecentChallenges from './components/RecentChallenges';
import Profile from './components/PageProfile';

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
                      <RecentChallenges />
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

            {/* page détail d'un challenges */}
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
            {/*Page profile*/}

            <Route 
            path="/profil"
            element={<Profile/>}
            />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        

          {/* Login & Register*/}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* mentions légales */}
          <Route path='/mentions-legales' element={<LegalPage />}/>

          {/* politique de confidentialité */}
          <Route path='/confidentialite' element={<PrivacyPolicyPage />}/>

          {/* conditions générales d'utilisation */}
          <Route path='/cgu' element={<CGUPage />}/>
        
        </Routes>
      </main>
      </div>
      <Sponsor />
      <Footer />
    </>
  );
};

export default App;