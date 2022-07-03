
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import * as stuff from "./stuff";
import Home from './Components/Home/Home';
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return(

  <Router>
       <header>
       
       <Routes>
              <Route exact path='*' element={<Home/>}></Route> 
          </Routes>
      
    </header>
          
         
      

  </Router>
  
  );
}

export default App;
