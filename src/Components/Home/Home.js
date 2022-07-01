import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import * as stuff from '../../stuff'
import SignUp from "../SignUp/SignUp";
import OtpVerify from "../SignUp/OtpVerify";
import SignIn from "../SignIn/SignIn";
import AdminPannel from "../AdminPannel/AdminPannel";
import StoreOwnerPannel from '../StoreOwnerPannel/StoreOwnerPannel'

const Home = () => {
    

    return (

        <div>
        
            <Navbar />
                <Routes>
                    <Route exact path = {stuff.SIGNUP.concat('/')} element = {<SignUp/>} />
                    <Route exact path = {stuff.VERIFY_OTP } element = { <OtpVerify/> }/>   
                    <Route exact path = {stuff.SIGNIN } element = { <SignIn/> }/>   
                    <Route path="/adminPannel" element={<AdminPannel />} />
                    <Route path="/storeOwnerPannel" element={<StoreOwnerPannel />} />
                          
                </Routes>
        
        </div>
    )

} 




export default Home;