import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ChallengeList from './components/ChallengeList';
import LeaderBord from './components/LeaderBord';
import Footer from './components/Footer';
import Sponsor from './components/Sponsor';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <div className="app-container">
        <main className="main-content">
          <Hero />

          <div className="dashboard-layout">
            <div className="left-panel">
              <ChallengeList />
            </div>
            <div className="right-panel">
              <LeaderBord />
            </div>
          </div>
        </main>

        <Sponsor />
      </div>

      <Footer />
    </>
  );
};

export default App;