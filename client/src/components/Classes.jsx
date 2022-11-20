import "../styles/Classes.css"
import Accordion from 'react-bootstrap/Accordion';
import {useState, useEffect} from "react"
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container"

function Classes({user, setUser}) {

    const [classes, setClasses] = useState([])

    async function getClasses() {
        const res = await fetch(`http://localhost:5500/class/prof/${user.prof_id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setClasses(parseRes)
    }

    useEffect(() => {
        getClasses()
    },[])

    return (
        <Container>
            <h1 style={{marginLeft:"1rem"}}>Vos classes</h1>
            <Accordion defaultActiveKey="0">
                {classes.slice().reduce((accumulator,currentValue) => {
                    if (accumulator.length !== 0 && currentValue.class_name === accumulator[accumulator.length-1].class_name) {
                        accumulator[accumulator.length-1].eleves.push(currentValue.eleve_name)
                        return accumulator
                    }
                    else {
                        accumulator.push({class_name:currentValue.class_name,eleves:[currentValue.eleve_name]})
                        return accumulator
                    }
                },[]).map(({class_name,eleves},index) => 
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{class_name}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                        {eleves.map((eleve_name,index) =>
                            <ListGroup.Item key={index}>{eleve_name}</ListGroup.Item>
                        )}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                )}
            </Accordion>
        </Container>
    )
}

export default Classes