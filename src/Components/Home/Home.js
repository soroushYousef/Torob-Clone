import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import * as stuff from '../../stuff'
import SignUp from "../SignUp/SignUp";

const Home = () => {
    

    return (

        <div>
        
            <Navbar />
                <Routes>
                    <Route exact path = {stuff.SIGNUP} element = {<SignUp/>} />
                </Routes>
        
        </div>
    )

} 




export default Home;