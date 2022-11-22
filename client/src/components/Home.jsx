import "../styles/Home.css"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import {Link} from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"

function Home({user, setUser, setResults}) {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const [courses, setCourses] = useState([])

    async function getSearch() {
        const res = await fetch(`http://localhost:5500/prof/eleve/${search}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setResults(parseRes)
        navigate("/search")
    }

    async function getCourses() {
        const res = await fetch(`http://localhost:5500/cours/today/${user.prof_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setCourses(parseRes)
    }

    useEffect(() => {
        if (user.prof_id) {
            getCourses()
        }
    },[user])

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
                <Container>
                    <Card style={{ width: '30rem', margin:"0", marginTop:"2rem" }}>
                        <Card.Body>
                            <Card.Title>Vos cours aujourd'hui</Card.Title>
                            <Card.Subtitle>{new Date().toLocaleDateString()}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <ListGroup as="ol" numbered style={{marginTop:"1rem"}}>
                        {courses.map(({cours_id,cours_date,class_name,matiere_name},index) => 
                            <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start" action style={{cursor:"pointer"}} onClick={() => navigate(`/cours/${cours_id}`)}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{matiere_name}</div>
                                    {class_name} {new Date(cours_date).toISOString().slice(11,16)} {" - "} {new Date(new Date(cours_date).getTime() + 5400000).toISOString().slice(11,16)}
                                </div>
                                {new Date(cours_date) > new Date() ? <Badge bg="primary">Futur</Badge> : <Badge bg="success">Passé</Badge>}
                            </ListGroup.Item>                       
                        )}
                    </ListGroup>
                </Container>
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