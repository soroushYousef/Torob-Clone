import {React,useEffect,useState} from "react";
import Countdown from 'react-countdown';
import './OtpVerify.css'

const OtpVerify = () => {

   const [code,setCode] = useState(null); 

   
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
            </div>
        </div>
    )

}


export default OtpVerify;