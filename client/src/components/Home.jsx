import "../styles/Home.css"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import {Link} from "react-router-dom"

function Home({user, setUser, setResults}) {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    async function getSearch() {
        const res = await fetch(`http://localhost:5500/prof/eleve/${search}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setResults(parseRes)
        navigate("/search")
    }

    if (user.prof_id) {
        return (
            <Container>
                <InputGroup style={{width:"50%", margin:"1rem"}}>
                    <Form.Control
                        placeholder="Eleve"
                        aria-label="Eleve"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => getSearch()}>Chercher</Button>
                </InputGroup>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <Alert variant="danger">Pour avoir accès à ce contenu, veuillez vous <Link to="/connection">connecter</Link></Alert>
            </Container>
        )
    }
}

export default Home