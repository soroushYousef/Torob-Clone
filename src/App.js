
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import * as stuff from "./stuff";
import Home from './Components/Home/Home';

function App() {
  return(

  <Router>
      <div className='App'>
          
          <Routes>
              <Route exact path='*' element={<Home/>}></Route> 
          </Routes>
      </div>

  </Router>
  
  );
}

export default App;
