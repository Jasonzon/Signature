import "../styles/Cours.css"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Cours({user, setUser}) {

    const {id} = useParams()

    const [participe, setParticipe] = useState([])
    const [cours, setCours] = useState({cours_date:"",matiere_name:"",class_name:""})

    const [checked, setChecked] = useState([])

    async function getParticipe(classe) {
        const res = await fetch(`http://localhost:5500/eleve/class/${classe}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setParticipe(parseRes)
        setChecked(parseRes.map((check) => false))
    }

    async function getCours() {
        const res = await fetch(`http://localhost:5500/cours/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setCours(parseRes)
        getParticipe(parseRes.cours_class)
    }

    useEffect(() => {
        getCours()
    },[])

    async function submit() {
        participe.forEach(async ({eleve_id},index) => {
            await fetch("http://localhost:5500/participe", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify({cours:id,eleve:eleve_id,state:checked[index]})
            })
        })
    }

    return (
        <Container>
            <Card style={{ width: '30rem', margin:"auto", marginTop:"4rem" }}>
                <Card.Body>
                    <Card.Title>{cours.matiere_name} {cours.class_name}</Card.Title>
                    <Card.Subtitle>{cours.cours_date.slice(0,10)}</Card.Subtitle>
                </Card.Body>
            </Card>
            <ListGroup style={{marginTop:"1rem"}}>
            {participe.sort((p1, p2) => (p1.eleve_name.split(" ")[1] < p2.eleve_name.split(" ")[1]) ? -1 : (p1.eleve_name.split(" ")[1] > p2.eleve_name.split(" ")[1]) ? 1 : 0).map(({eleve_id, eleve_name},index) => 
                    <ListGroup.Item action key={index} onClick={() => setChecked(checked.map((check,id) => index === id ? !check : check))}>
                        <Form>
                            <Form.Check type="checkbox" id={index} label={eleve_name} checked={checked[index]}/>
                        </Form>
                    </ListGroup.Item>
            )}
            </ListGroup>    
            <Button onClick={() => submit()} style={{marginTop:"1rem",marginLeft:"50%",transform:"translateX(-50%)",fontSize:"1.2rem"}}>Valider</Button>
        </Container>
    )
}

export default Cours