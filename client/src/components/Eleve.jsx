import "../styles/Search.css"
import ListGroup from "react-bootstrap/ListGroup"
import {useState} from "react"
import Container from "react-bootstrap/Container"

function Eleve({user, setUser, results}) {

    const [eleve, setEleve] = useState([])

    return (
        <Container>
            <ListGroup>
                {results.map(({eleve_name, eleve_id},index) => 
                    <ListGroup.Item action variant="light" key={index}>{eleve_name}</ListGroup.Item>
                )}
            </ListGroup>
            <h2>Absences</h2>
            <ListGroup>
                {eleve.map()}
            </ListGroup>
        </Container>
    )
}

export default Eleve