import {React,useEffect,useState} from "react";
import * as stuff from "../../stuff";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import '../AdminPannel/AdminPannel.css';
import '../SignUp/SignUp.css';
import Favorite from './favorits' ;
import Cookies from 'universal-cookie';
import { changeLoginState,filterAndSave} from '../redux/reducer';
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
    const [isLoad,setIsLoad] = useState(false);
    const [message,setMessage]=useState(null);
    const [isValid,setisValid]=useState(null);
    const [sehat,setSehat]=useState(null);
    const [sehat1,setSehat1]=useState(null);
    const[canseefave,setcanseefav]=useState(null);
    const[data,setData]=useState(null);
    const [isValid1,setisValid1]=useState(null);
    const dispatch=useDispatch();
    const arr_data = useSelector((state)=>state.slice_for_torob.holder);
    const cookies = new Cookies();

    useEffect(() => {
        setData(arr_data);
      }, [arr_data]);
   
    const getfavorits = async()=>{
        setIsLoad(true);
        fetch(stuff.serverAddress.concat('api/user/getfavorits'),{
            method:"GET",
            
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            setisValid(true);
            setIsLoad(false);
            setSehat(true);
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                setMessage(json.error.message);
                setIsLoad(false);
                setisValid(false);
                setcanseefav(null);
               
            }else{
                setMessage(json.message);
                console.log(json);
                setcanseefav(true);
                setData(json.favorits.favorites);
                dispatch(filterAndSave({arr:json.favorits.favorites,target:1}));
                
                
            }
        });

    }
    const submitAction = (which) => {
        if(which===1){
            setcanseefav(true);
            getfavorits();
            
        }else{
            
        }
    }

    return(
        <div className="div_two">
            <div className="container h-100 signup-container mt-5">
            
            <div style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}className="d-flex flex-column justify-content-center px-2 ">
                <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> here you can see your favorite products</p>
                </div>
                    {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(1)}> click to see </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  click to see   </button>
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
                     {
                        canseefave?
                        <div className="div_two">
                           {
                            data!==null?
                            data.map((product) => (
                                <Favorite key={product.productId} product={product} />
                                ))
                            :
                            null
                           }
                            
                        </div>
                        :
                        null
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
                    <label className="mb-2" htmlFor="inputName">نام کاربری</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setUser(e.target.value)} placeholder="نام صاحب را وارد کنید" />
                   
                </div>
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">آدرس ایمیل</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل صاحب را وارد کنید" />
                   
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2" htmlFor="inputPassword">رمز عبور</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={ (e) => setpass(e.target.value) } />
                </div>
                
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">شماره موبایل </label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setMobile(e.target.value)} placeholder="موبایل صاحب را وارد کنید" />
                   
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(2)}> افزودن </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ... در حال افزودن</button>
                    }
                    { isValid1 === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                        : sehat1?
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

export default ProfilePage;