function Header(){
    return(
        <header className="header">
            <div className="logo">GamerChallenges</div>
        <nav>
            <h2>GamerChallenges</h2>
            <ul>
                <li>Accueil</li>
                <li>Liste des Challenges</li>
                <li>Classement</li> 
                
            </ul>
        </nav>
        <button className="login-btn">Connexion</button>
        </header>
    )
}

export default Header