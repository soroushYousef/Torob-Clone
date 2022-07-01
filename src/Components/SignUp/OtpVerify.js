import {React,useEffect,useState} from "react";
import Countdown from 'react-countdown';
import Cookies from 'universal-cookie';
import './OtpVerify.css';
import axios from "axios";
import * as stuff from "../../stuff";
import './SignUp.css'
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const OtpVerify = () => {
    const [isValid,setIsValid] = useState(true); 
    const[code,setCode]=useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [message,setMessage] = useState('');
    const cookies = new Cookies();
 
    const validation = async() =>{
        try{
        const result = await axios.post(stuff.serverAddress.concat(stuff.VERIFY_OTP), {
            number:code,
            name:location.state.name
        });
        console.log(result);
        cookies.set('jwt', result.data.token, { path: '/' });
        cookies.set('isAdmin', result.data.isAdmin, { path: '/' });
        cookies.set('isStoreOwner', result.data.isStoreOwner, { path: '/' });
        setIsValid(true);
        navigate('/',{replace:true})
        }catch(error) {
            console.log(error);
            if(error.response){
                setMessage(error.response.data.error.message)
                setIsValid(false)
            }
        }
    } 
   useEffect(() => {
    if(code!== null){
        if(code.length === 6){
            validation();
        }
        setIsValid(true);
    }
    
  }, [code]);
   
    return(
        <div className="container">
            <div className="d-flex flex-column align-items-center otp-container">
                <h3 className="mt-5 form-header">لطفا کد ارسال شده به ایمیل خود را وارد کنید</h3>
                <form action="">
                        <div className="from-group mb-4 mt-5">
                            <label className="mb-2" htmlFor="inputName">کد تایید</label>
                            <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setCode(e.target.value)} placeholder="کد ارسال شده به ایمیل" />

                        </div>
                    </form>
                    <Countdown
                        date={Date.now() + 300*1000 }
                        intervalDelay={0}
                        precision={1}
                        renderer={props => <div className="timer"> زمان باقی مانده :  { parseInt(props.total/1000)}</div>}
                    />
                    { isValid === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                        </div>
                : null}  
            </div>
        </div>
    )

}


export default OtpVerify;