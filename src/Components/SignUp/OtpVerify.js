import {React,useEffect,useState} from "react";



const OtpVerify = () => {

    const [code,setCode] = useState(null);


    return(
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h3>لطفا کد ارسال شده به ایمیل خود را وارد کنید</h3>
            </div>
        </div>
    )

}


export default OtpVerify;