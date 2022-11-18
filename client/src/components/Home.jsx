import "../styles/Home.css"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useState} from "react"

function Home({user, setUser}) {

    const [results, setResults] = useState([])

    const [search, setSearch] = useState("")

    async function getSearch() {
        const res = await fetch(`http://localhost:5000/prof/eleve/${search}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setResults(parseRes)
    }

    return (
        <InputGroup style={{width:"50%", margin:"1rem"}}>
            <Form.Control
                placeholder="Eleve"
                aria-label="Eleve"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={() => getSearch()}>
            Chercher
            </Button>
        </InputGroup>
    )
}

export default Home