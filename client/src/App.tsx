import Header from "./components/Header"
import Hero from "./components/Hero"
import ChallengeList from "./components/ChallengeList"
import Leaderboard from "./components/LeaderBord"
import Sponsors from "./components/Sponsor"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom"


import "./App.css"

function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          {/* page d'accueil */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ChallengeList />
                <Leaderboard />
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

          {/* page sponsors */}
          <Route
            path="/sponsors"
            element={<Sponsors />}
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
  )
}

export default App