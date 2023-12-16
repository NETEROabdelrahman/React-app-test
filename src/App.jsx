import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {



  
  return (
    <Router>
      <Navbar/>
        
      <Routes>
        <Route path="/" element={<Hero />} />
        
      </Routes>
    </Router>
  )
  
}

export default App
