import "../styles/Classes.css"
import Accordion from 'react-bootstrap/Accordion';
import {useState, useEffect} from "react"

function Classes() {

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
                    {eleves.map(({eleve_name},index) =>
                        <p key={index}>{eleve_name}</p>
                    )}
                </Accordion.Body>
            </Accordion.Item>
            )}
        </Accordion>
    )
}

export default Classes