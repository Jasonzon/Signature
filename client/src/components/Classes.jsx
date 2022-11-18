import "../styles/Classes.css"
import Accordion from 'react-bootstrap/Accordion';
import {useState, useEffect} from "react"
import ListGroup from 'react-bootstrap/ListGroup';

function Classes({user, setUser}) {

    const [classes, setClasses] = useState([])

    async function getClasses() {
        const res = await fetch(`http://localhost:5000/class/prof/${user.prof_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setClasses(parseRes)
    }

    useEffect(() => {
        getClasses()
    },[])

    return (
        <Accordion defaultActiveKey="0">
            {classes.map(({class_name,eleves},index) => 
            <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{class_name}</Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                    {eleves.map(({eleve_name},index) =>
                        <ListGroup.Item key={index}>{eleve_name}</ListGroup.Item>
                    )}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            )}
        </Accordion>
    )
}

export default Classes