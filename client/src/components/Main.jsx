import "../styles/Main.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home"
import Error from "./Error"

function Main() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  )
}

export default Main
