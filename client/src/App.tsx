import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ChallengeList from './components/ChallengeList';
import LeaderBord from './components/LeaderBord';
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
             <LeaderBord />
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
                <Hero />
                <ChallengeList />
              </>
            }
          />

          {/* page leaderboard */}
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<p>Page introuvable</p>}
          />
        </Routes>
      </main>
      <Sponsors />
      <Footer />
    </>
  );
};

export default App;