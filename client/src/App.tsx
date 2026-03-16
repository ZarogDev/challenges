import Header from "./components/Header"
import Hero from "./components/Hero"
import ChallengeList from "./components/ChallengeList"
import Leaderboard from "./components/LeaderBord"
import Sponsors from "./components/sponsor"
import Footer from "./components/Footer"


import "./App.css"

function App() {
  return(
    <>
    <header />
    <Hero />
    <main className="main-content">
      <ChallengeList />
      <Leaderboard />
    </main>
    <Sponsors />
    <Footer />
    </>
  )
}

export default App