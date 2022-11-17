import "../styles/Main.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home"
import Error from "./Error"
import Connection from "./Connection";
import {useState, useEffect} from "react"
import Schedule from "./Schedule"
import Header from "./Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import Classes from "./Classes"

function Main() {

  const [user, setUser] = useState({})
  const [connection, setConnection] = useState(true)

  async function auth() {
    if (localStorage.token) {
        const res = await fetch("/prof/auth", {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes = await res.json()
        const res2 = await fetch(`/prof/${parseRes.polyuser_id}`, {
            method: "GET"
        })
        const parseRes2 = await res2.json()
        setUser({prof_id:parseRes2.prof_id,prof_mail:parseRes.prof_mail,prof_name:parseRes2.prof_name})
    }
  }

  useEffect(() => {
      auth()
  },[])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home user={user} setUser={setUser} />} />
        <Route exact path="/connection" element={<Connection user={user} setUser={setUser} connection={connection} setConnection={setConnection} />} />
        <Route exact path="/schedule" element={<Schedule user={user} setUser={setUser} />} />
        <Route exact path="/classes" element={<Classes user={user} setUser={setUser} />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  )
}

export default Main
