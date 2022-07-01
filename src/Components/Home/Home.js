import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import * as stuff from '../../stuff'
import SignUp from "../SignUp/SignUp";
import OtpVerify from "../SignUp/OtpVerify";

const Home = () => {
    

    return (

        <div>
        
            <Navbar />
                <Routes>
                    <Route exact path = {stuff.SIGNUP.concat('/')} element = {<SignUp/>} />
                    <Route exact path = {stuff.VERIFY_OTP } element = { <OtpVerify/> }/>                     
                </Routes>
        
        </div>
    )

} 




export default Home;