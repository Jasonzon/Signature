import "../styles/Home.css"

function Home({user, setUser}) {
    return (
        <div className="home">
            <h1>Signature</h1>
            {user.name ? 
            <nav>
                <label for="search">Rechercher un élève</label>
                <input id="search"/>
                <button>Faire l'appel</button>
                <button>Se déconnecter</button>
            </nav> :
            <nav>
                <button>Se connecter</button>
            </nav> }
        </div>
    )
}

export default Home