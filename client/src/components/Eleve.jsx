import "../styles/Search.css"
import ListGroup from "react-bootstrap/ListGroup"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

function Eleve({user, setUser, results}) {

    const {id} = useParams()

    const [absences, setAbsences] = useState([])
    const [eleve, setEleve] = useState({eleve_name:"",class_name:""})

    async function getAbsences() {
        const res = await fetch(`http://localhost:5500/eleve/absence/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setAbsences(parseRes)
    }

    async function getEleve() {
        const res = await fetch(`http://localhost:5500/eleve/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setEleve(parseRes)
    }

    useEffect(() => {
        getEleve()
        getAbsences()
    },[])

    return (
        <Container>
            <Card style={{ width: '30rem', margin:"auto", marginTop:"4rem" }}>
                <Card.Body>
                    <Card.Title>{eleve.eleve_name}</Card.Title>
                    <h2>{eleve.class_name}</h2>
                </Card.Body>
            </Card>
            <h2 style={{marginLeft:"1rem"}}>Absences</h2>
            <ListGroup>
                {absences.map(({cours_date,matiere_name},index)=> 
                    <ListGroup.Item action key={index}>{cours_date.slice(0,10)} {cours_date.slice(11,19)} <b>{matiere_name}</b></ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    )
}

export default Eleve