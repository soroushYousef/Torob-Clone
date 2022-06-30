import {React,useEffect,useState} from "react";
import './SignUp.css'
import PasswordStrengthBar from 'react-password-strength-bar';

const SignUp = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isValidPassword,setIsValidPassword] = useState(null); 
    const [isValidEmail,setIsValidEmail] = useState(null)

    const passwordValidation = (password) => {
        const strongPassword = /^(?=.*[0-9])[A-Za-z]\w{8,100}$/ ;
        return password.match(strongPassword) !== null
    }

    const emailValidation = (email) => {
        const emailForm =  /\S+@\S+\.\S+/ ;
        return email.match(emailForm) !==null;
    }

    const submitAction = (password,email) => {
        
        setIsValidPassword(passwordValidation(password))
        setIsValidEmail(emailValidation(email))
        
    }

    return(
        <div className="container h-100 signup-container mt-5">
        <div className="d-flex flex-column justify-content-center px-2">
            <form action="">
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">آدرس ایمیل</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل خود را وارد کنید" />
                   
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2" htmlFor="inputPassword">رمز عبور</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={ (e) => setPassword(e.target.value) } />
                </div>
                </form>
                <button type="submit" className="btn btn-primary mb-4 submit-button " onClick={ () => submitAction(password,email) }>ثبت نام</button>
                {isValidPassword===false ? 
                <div class="alert alert-danger" role="alert">
                     <p>پسورد باید شامل حداقل یک رقم و دست کم 8 کاراکتر باشد</p>
                </div>
                : null}
                 {isValidEmail===false ? 
                <div class="alert alert-danger" role="alert">
                     <p>ایمیل را درست وارد کنید</p>
                </div>
                : null}
           
        </div>
        </div>
    )
}

export default SignUp;