import "../styles/Connection.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import {useState, useEffect} from "react"
import Container from "react-bootstrap/Container"
import ListGroup from 'react-bootstrap/ListGroup';

function Connection({user, setUser}) {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const [matieres, setMatieres] = useState([])

    async function getMatieres() {
        const res = await fetch(`http://localhost:5500/matiere/prof/${user.prof_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setMatieres(parseRes)
    }

    useEffect(() => {
        if (user.prof_name) {
            getMatieres()
        }
    },[user])

    async function submit() {
        if (mail === "" || password === "") {
            setError("Information manquante")
        }
        else {
            const body = {mail,password}
            const res = await fetch("http://localhost:5500/prof/connect", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
            const parseRes = await res.json()
            if (parseRes.rows.length !== 0) {
                if (parseRes.token) {
                    localStorage.setItem("token",parseRes.token)
                    setUser(parseRes.rows[0])
                }
                else {
                    setError("Mail ou Mot de passe incorrect")
                }
            }
        }
    }

    if (!user.prof_name) {
        return (
            <Card style={{ width: '30rem', margin:"auto", marginTop:"4rem" }}>
                <Card.Body>
                    <Card.Title>Connexion</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setMail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            <Form.Text style={{color:"red"}} className="text-muted">{error}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" onClick={() => submit()}>Valider</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
    else {
        return (
            <Container>
                <Card style={{ width: '30rem', margin:"auto", marginTop:"2rem" }}>
                    <Card.Body>
                        <Card.Title>{user.prof_name}</Card.Title>
                        <Card.Subtitle>{user.prof_mail}</Card.Subtitle>
                    </Card.Body>
                </Card>
                <h1 style={{marginLeft:"1rem",marginTop:"1rem"}}>Vos cours</h1>
                <ListGroup style={{marginTop:"1rem"}}>
                    {matieres.map(({matiere_name},index) => 
                        <ListGroup.Item key={index}>{matiere_name}</ListGroup.Item>
                    )}
                </ListGroup>
            </Container>
        )
    }
}

export default Connection