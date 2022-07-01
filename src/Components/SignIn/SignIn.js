import {React,useEffect,useState} from "react";
import './SignIn.css'
import * as stuff from "../../stuff";
import axios from "axios";
import Cookies from 'universal-cookie';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState} from '../redux/reducer'

const SignIn = () => {
    const dispatch = useDispatch();
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [message,setMessage] = useState('');
    const [isValid,setIsValid] = useState(null); 
    const [isLoad,setISLoad] = useState(false);   
    const cookies = new Cookies();
    const navigate = useNavigate();
    

    const Handle_SignIn = async() =>{

        try{
            setISLoad(true);
        const result = await axios.post(stuff.serverAddress.concat(stuff.SIGNIN), {
            name : name,
            password : password
        });
        setIsValid(true);
        setISLoad(false);
        cookies.set('jwt', result.data.token, { path: '/' });
        cookies.set('isAdmin', result.data.isAdmin, { path: '/' });
        cookies.set('isStoreOwner', result.data.isStoreOwner, { path: '/' });
        dispatch(changeLoginState());
        navigate('/',{replace:true})
        }catch(error) {
            if(error.response){
               setISLoad(false);
                setMessage(error.response.data.error.message)
                setIsValid(false)
            }
        }
    }
    const submitAction = () => {
        Handle_SignIn()
    }

    return(
        <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2">
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName">نام کاربری</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} placeholder="نام خود را وارد کنید" />
                   
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2" htmlFor="inputPassword">رمز عبور</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={ (e) => setPassword(e.target.value) } />
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}> ورود</button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ... ورود</button>
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

export default SignIn;