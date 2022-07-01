import {React,useEffect,useState} from "react";
import './SignUp.css'
import * as stuff from "../../stuff";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [message,setMessage] = useState('');
    const [isValid,setIsValid] = useState(null);    

    const SignUp = async(e) =>{
        //e.preventdefault()
        

        try{
        const result = await axios.post(stuff.serverAddress.concat(stuff.SIGNUP), {
            name : name,
            email : email,
            password : password
        });
        
        }catch(error) {
            if(error.response){
                // console.log(error.response.data.error.message)
                setMessage(error.response.data.error.message)
                setIsValid(false)
            }
        }
    }
    const submitAction = (password,email) => {
        
        // setIsValidPassword(passwordValidation(password))
        // setIsValidEmail(emailValidation(email))
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
                <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(password,email) }> <Link style={{textDecoration : 'none' , color : 'white'}} to={ stuff.VERIFY_OTP }>ثبت نام</Link>  </button>
                {/* {isValidPassword===false ? 
                <div class="alert alert-danger" role="alert">
                     <p>پسورد باید شامل حداقل یک رقم و دست کم 8 کاراکتر باشد</p>
                </div>
                : null} */}
                 {/* {isValidEmail===false ? 
                <div class="alert alert-danger" role="alert">
                     <p>ایمیل را درست وارد کنید</p>
                </div>
                : null} */}
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