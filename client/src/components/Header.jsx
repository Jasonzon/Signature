import "../styles/Header.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

function Header({user, setUser}) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user.prof_id ? <Nav.Link><Link to="/classes">Classes</Link></Nav.Link> : null}
                        <Nav.Link><Link to="/connection">Account</Link></Nav.Link>
                        <Nav.Link>{user.prof_name}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header