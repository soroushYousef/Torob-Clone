import {React,useEffect,useState} from "react";
import * as stuff from "../../stuff";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import './AdminPannel.css';
import '../SignUp/SignUp.css';
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import {changeLoginState,filterAndSave,updateCaategory} from '../redux/reducer'

const AdminPannel = () => {
    const [isLoad,setIsLoad] = useState(false);
    const dispatch = useDispatch();
    const [message,setMessage]=useState(null);
    const [isValid,setisValid]=useState(null);
    const [isValid1,setisValid1]=useState(null);
    const [name,setName]=useState(null);
    const [path,pathName]=useState(null);
    const [sehat,setSehat]=useState(null);
    const [sehat1,setSehat1]=useState(null);
    const[user_name,setUser]=useState(null);
    const[user_email,setEmail]=useState(null);
    const[mobile,setMobile]=useState(null);
    const[pass,setpass]=useState(null);
    const [fields,setfields]=useState(null);
    const cookies = new Cookies();
   
    const addCategory = async(e) =>{

        try{
            setIsLoad(true);
            let config = axios.interceptors.request.use(
                config => {
                  config.headers['Authorization'] = `Bearer ${cookies.get("jwt")}`;
                  console.log(config);
                  console.log("jjjjjjjjjjjjj");
                      return config;
                  },
                  error => {
                      return Promise.reject(error);
                  }
              );
            let result = await axios.post(stuff.serverAddress.concat(stuff.ADDCATEGORY).concat(`/addCategory?name=${name}&path=${path}&fields=${fields}`), {
           
                config
           
                });
                setisValid(true);
                setIsLoad(false);
                setSehat(true);
                dispatch(updateCaategory());
                setMessage(result.data.message); 
        
        }catch(error) {
            if(error.response){
                console.log(error);
                setIsLoad(false);
                setMessage(error.response.data.error.message)
                setisValid(false)
            }
        }
    }
    const addStoreOwner = async(e) =>{

        try{
            setIsLoad(true);
            let config = axios.interceptors.request.use(
                config => {
                  config.headers['Authorization'] = `Bearer ${cookies.get("jwt")}`;
                  console.log(config);
                  console.log("jjjjjjjjjjjjj");
                      return config;
                  },
                  error => {
                      return Promise.reject(error);
                  }
              );
            let result = await axios.post(stuff.serverAddress.concat(stuff.ADDSTOREOWNER), {
                
                    name : user_name,
                    email : user_email,
                    password : pass,
                    mobile_number:mobile
                
                ,config
           
                });
                setisValid(true);
                setIsLoad(false);
                setSehat(true);
                setMessage(result.data.message);
          
                
            
        
        
        }catch(error) {
            if(error.response){
                console.log(error);
                setIsLoad(false);
                setMessage(error.response.data.error.message)
                setisValid(false)
            }
        }
           
    }
    const submitAction = (which) => {
        if(which===1){
            addCategory();
        }else{
            addStoreOwner();
        }
    }

    return(
        <div className="div_two">
            <div className="container h-100 signup-container mt-5">
            
            <div style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}className="d-flex flex-column justify-content-center px-2 ">
                <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> admin can add category here</p>
                </div>
                <form action="">
                <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputName">?????? ???????????? ???????? </label>
                        <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} placeholder="  ?????? ???????????? ???? ???????? ????????  " />
                       
                    </div>
                    <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">path of category </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => pathName(e.target.value)} placeholder="    ???????? ?????????? ???? ???????????? ?????? ???? ???????? ????????" />
                       
                    </div>
                    <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">fields </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setfields(e.target.value)} placeholder="fields with -" />
                       
                    </div>
                    </form>
                    {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(1)}> ???????????? </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ... ???? ?????? ????????????</button>
                    }
                    { isValid === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                        : sehat?
                                <div style={{backgroundColor:"green"}}>
                                    <p>{message}</p>
                                </div>
                     :null
                    
                    } 
            </div>
            </div>




            <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2" style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}>
        <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> admin can add storeOwner here!</p>
                </div>
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName">?????? ????????????</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setUser(e.target.value)} placeholder="?????? ???????? ???? ???????? ????????" />
                   
                </div>
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">???????? ??????????</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="?????????? ???????? ???? ???????? ????????" />
                   
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2" htmlFor="inputPassword">?????? ????????</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={ (e) => setpass(e.target.value) } />
                </div>
                
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">?????????? ???????????? </label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setMobile(e.target.value)} placeholder="???????????? ???????? ???? ???????? ????????" />
                   
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(2)}> ???????????? </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ... ???? ?????? ????????????</button>
                    }
                    { isValid === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                        : sehat?
                                <div style={{backgroundColor:"green"}}>
                                    <p>{message}</p>
                                </div>
                     :null
                    
                    } 
                
           
        </div>
        </div>
        </div>
    )
}

export default AdminPannel;