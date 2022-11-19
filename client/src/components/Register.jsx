import "../styles/Register.css"
import {useState} from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Register({user, setUser}) {

    const [inputs, setInputs] = useState({name:"",mail:"",password:""})

    async function register() {
        const body = {mail:inputs.mail, name:inputs.name, password:inputs.password}
        console.log(body)
        const res2 = await fetch("http://localhost:5500/prof", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(body)
        })
    }

    return (
        <Card style={{ width: '30rem', margin:"auto", marginTop:"4rem" }}>
            <Card.Body>
                <Card.Title>Enregistrement</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={inputs.mail} onChange={(e) => setInputs({...inputs,mail:e.target.value})} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlID="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={inputs.name} onChange={(e) => setInputs({...inputs,name:e.target.value})} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={inputs.password} onChange={(e) => setInputs({...inputs,password:e.target.value})} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" onClick={() => register()}>Valider</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register