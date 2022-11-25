import "../styles/Cours.css"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Cours({user, setUser}) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [participe, setParticipe] = useState([])

    const [cours, setCours] = useState({cours_date:"",matiere_name:"",class_name:""})

    async function getParticipe() {
        const res = await fetch(`http://localhost:5500/participe/cours/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setParticipe(parseRes.sort((p1, p2) => (p1.eleve_name.split(" ")[1] < p2.eleve_name.split(" ")[1]) ? -1 : (p1.eleve_name.split(" ")[1] > p2.eleve_name.split(" ")[1]) ? 1 : 0))
    }

    async function getCours() {
        const res = await fetch(`http://localhost:5500/cours/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        console.log(parseRes)
        if (!parseRes.cours_date) {
            navigate("/")
        }
        else {
            setCours(parseRes)
        }
    }

    useEffect(() => {
        getCours()
        getParticipe()
    },[])

    async function submit() {
        participe.forEach(async ({participe_id,participe_eleve,participe_state}) => {
            await fetch(`http://localhost:5500/participe/${participe_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify({cours:id,eleve:participe_eleve,state:participe_state})
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
            {participe.map(({eleve_name},index) => 
                    <ListGroup.Item action key={index} onClick={() => setParticipe(participe.map((participation,id) => { return {...participation,participe_state:index === id ? !participe[id].participe_state : participe[id].participe_state}}))}>
                        <Form>
                            <Form.Check onClick={(e) => {e.preventDefault();setParticipe(participe.map((participation,id) => { return {...participation,participe_state:index === id ? !participe[id].participe_state : participe[id].participe_state}}))}} type="checkbox" id={index} label={eleve_name} checked={participe[index].participe_state}/>
                        </Form>
                    </ListGroup.Item>
            )}
            </ListGroup>    
            <Button onClick={() => submit()} style={{marginTop:"1rem",marginLeft:"50%",transform:"translateX(-50%)",fontSize:"1.2rem"}}>Valider</Button>
        </Container>
    )
}

export default Cours