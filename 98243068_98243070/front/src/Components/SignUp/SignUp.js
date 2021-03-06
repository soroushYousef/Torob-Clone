import {React,useEffect,useState} from "react";
import './SignUp.css'
import * as stuff from "../../stuff";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import OtpVerify from "./OtpVerify";

const SignUp = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [message,setMessage] = useState('');
    const [isValid,setIsValid] = useState(null); 
    const [isLoad,setISLoad] = useState(false);   
    const navigate = useNavigate();
    

    const SignUp = async(e) =>{

        try{
            setISLoad(true);
        const result = await axios.post(stuff.serverAddress.concat(stuff.SIGNUP), {
            name : name,
            email : email,
            password : password
        });
        setIsValid(true);
        setISLoad(false);
        navigate('/'.concat(stuff.VERIFY_OTP),{replace:true,state:{name:name}})
        }catch(error) {
            if(error.response){
               setISLoad(false);
                setMessage(error.response.data.error.message)
                setIsValid(false)
            }
        }
    }
    const submitAction = () => {
        SignUp()
    }

    return(
        <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2">
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName">نام کاربری</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} placeholder="نام خود را وارد کنید" />
                   
                </div>
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">آدرس ایمیل</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل خود را وارد کنید" />
                   
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2" htmlFor="inputPassword">رمز عبور</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={ (e) => setPassword(e.target.value) } />
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}> ثبت نام</button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ...ثبت نام</button>
                }
                { isValid === false ? 
                <div class="alert alert-danger" role="alert">
                     <p>{message}</p>
                </div>
                : null} 
           
        </div>
        </div>
    )
}

export default SignUp;