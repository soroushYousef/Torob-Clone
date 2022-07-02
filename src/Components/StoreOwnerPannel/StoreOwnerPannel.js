import {React,useEffect,useState} from "react";
import * as stuff from "../../stuff";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import '../AdminPannel/AdminPannel.css';
import '../SignUp/SignUp.css';
import Cookies from 'universal-cookie';
import Report from './report' ;

const StoreOwnerPannel = () => {
    const [isLoad,setIsLoad] = useState(false);
    const [message,setMessage]=useState(null);
    const [isValid,setisValid]=useState(null);
    const [name,setName]=useState(null);
    const [path,pathName]=useState(null);
    const [sehat,setSehat]=useState(null);
    const[store_name,setUser]=useState(null);
    const[user_email,setEmail]=useState(null);
    const[mobile,setMobile]=useState(null);
    const[pass,setpass]=useState(null);
    const[addPrd,setaddprd]=useState(null);
    const[addstr,setaddstr]=useState(null);
    const[editprf,seteditprf]=useState(null);
    const[seerepo,setseerepo]=useState(null);
    const [canseeRepo,setcan]=useState(null);
    const [notavailable,setnot]=useState(null);
    const [price,setprice]=useState(null);
    const [link,setlink]=useState(null);
    const [data,usedata]=useState(null);
    const [field_one,setfieldone]=useState(null);
    const [field_two,setfieldtwo]=useState(null);
    const [field_three,setfieldthree]=useState(null);
    const [field_four,setfieldfour]=useState(null);
    const [notavailableloaded,setnavlo]=useState(null);
    const[productesm,setesm]=useState(null);
    const [json_field,setjf]=useState(null);
    const cookies = new Cookies();
   

    const whichAction = (which) => {
        setaddprd(false);
        setaddstr(false);
        seteditprf(false);
        setseerepo(false);
        setSehat(null);
        setisValid(null);
        setnot(null);
        setMobile(null);
        setEmail(null);
        setName(null);
        setcan(null);
        if(which===1){
            setaddprd(true);
        }else if(which===2){
            setaddstr(true);
        }else if(which===3){
            seteditprf(true);
        }else{
            setseerepo(true);
        }
    }
    const addStore = async ()=>{
        try{
            setIsLoad(true);
            fetch(stuff.serverAddress.concat(`api/storeOwner/addStore`),{
                method:"POST",
                body: JSON.stringify({
                    name:store_name
                }),
                headers:{
                    "Authorization":`Bearer ${cookies.get("jwt")}`,
                    "Content-type" : "application/json;charset=UTF-8"
                }
            }).then(response=>response.json()).then(json=>{
                setisValid(true);
                setIsLoad(false);
                setSehat(true);
                setName(null);
                setnot(null);
                setMobile(null);
                setEmail(null);
                setcan(null);
                console.log(json);
                if(json.error!==undefined){
                    console.log("here1");
                    setMessage(json.error.message);
                    setIsLoad(false);
                    setisValid(false);
                }else{
                    setMessage(json.message);
                }
            });
                
               
        
        }catch(error) {
            if(error.response){
                console.log(error);
                setIsLoad(false);
                setisValid(false)
            }
        }
    }

    const seeReports = async ()=>{
        setIsLoad(true);
        fetch(stuff.serverAddress.concat(`api/storeOwner/seereports?storeName=${store_name}`),{
            method:"GET",
            
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            setisValid(true);
            setIsLoad(false);
            setSehat(true);
            setnot(null);
            setName(null);
            setEmail(null);
            setMobile(null);
            setcan(true);
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                console.log(json.reoprts);
                setMessage(json.error.message);
                setIsLoad(false);
                setisValid(false);
                setcan(null);
            }else{
                setMessage(json.message);
                usedata(json.reports);
                
            }
        });
    }

    const editProfile = async ()=>{
        try{
            setIsLoad(true);
            const for_send = {};
            if(name!==null){
                for_send.name = name;
            }
            if(user_email!==null){
                for_send.email=user_email;
            }
            if(mobile!==null){
                for_send.mobile_number = mobile;
            }
            fetch(stuff.serverAddress.concat(`api/storeOwner/profileEdit`),{
                method:"POST",
                body: JSON.stringify(for_send),
                headers:{
                    "Authorization":`Bearer ${cookies.get("jwt")}`,
                    "Content-type" : "application/json;charset=UTF-8"
                }
            }).then(response=>response.json()).then(json=>{
                setisValid(true);
                setIsLoad(false);
                setnot(null);
                setSehat(true);
                setName(null);
                setcan(null);
                setEmail(null);
                setMobile(null);
                console.log(json);
                if(json.error!==undefined){
                    console.log("here1");
                    setMessage(json.error.message);
                    setIsLoad(false);
                    setisValid(false);
                }else{
                    setMessage(json.message);
                    if(json.token!==''){
                        cookies.set("jwt",json.token);
                    }
                }
            });
        }catch(error) {
            if(error.response){
                setIsLoad(false);
                setisValid(false)
            }
        }
    }

    const submitAction = (which) => {
        if(which===1){

        }else if(which===2){
            addStore();
        }else if(which===3){
            editProfile();
        }else if(which===4){
            seeReports();
        }
    }
   
    const getfields = async()=>{
        setnavlo(true);
        if(1===0){
            setMessage('pls enter first path category');
            setIsLoad(false);
            setisValid(false);
            setcan(null);
            setnot(null);
            console.log("here2");
            
        }else{
        fetch(stuff.serverAddress.concat(`api/storeOwner/fields?pc=${path}`),{
            method:"GET",
            
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            setisValid(true);
            setIsLoad(false);
            setSehat(true);
            setName(null);
            setEmail(null);
            setMobile(null);
            setcan(true);
            setnavlo(null);
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                setMessage(json.error.message);
                setIsLoad(false);
                setisValid(false);
                setcan(null);
            }else{
                setMessage(json.message);
                setjf(json);
                console.log(json);
                
            }
        }).catch(err=>{
            console.log(err);

        });}

    }

    const addproduct=async()=>{
        if(field_one===null || field_two===null || field_three===null || field_four===null){
            setMessage('field ha hame kamel nistand!');
            setIsLoad(false);
            setisValid(false);

        }else{
        setIsLoad(true);
        const f_se = field_one+"-"+field_two+"-"+field_three+"-"+field_four;
        fetch(stuff.serverAddress.concat(`api/storeOwner/addProduct`),{
            method:"POST",
            body: JSON.stringify({
                pathCategory:path,
                storeName:store_name,
                productName:productesm,
                productPrice:price,
                productFields:f_se,
                link:link
            }),
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            setisValid(true);
            setIsLoad(false);
            setnot(null);
            setSehat(true);
            setName(null);
            setcan(null);
            setEmail(null);
            setMobile(null);
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                setMessage(json.error.message);
                setIsLoad(false);
                setisValid(false);
            }else{
                setMessage(json.message);
                
            }
        });
    }
    }

    const handle_fields = async()=>{
        console.log(path);
        if(path===null){
            console.log(addPrd);
            console.log("here2");
            
        }else{
        setnot(true);
        getfields();
        }
        

    }

    return(
        <div>
        <div className="div_two_1">
        <button type="submit"  style={{backgroundColor:"purple"}}className="btn btn-primary mb-4 submit-button "  onClick={ (e) => whichAction(1)}> addProduct </button>
        <button type="submit"  style={{backgroundColor:"purple"}}className="btn btn-primary mb-4 submit-button " onClick={ (e) => whichAction(2)}> addStore </button>
        <button type="submit"  style={{backgroundColor:"purple"}}className="btn btn-primary mb-4 submit-button " onClick={ (e) => whichAction(3)}> editProfile </button>
        <button type="submit"  style={{backgroundColor:"purple"}}className="btn btn-primary mb-4 submit-button " onClick={ (e) => whichAction(4)}> seeReports </button>
                    :
                    
        </div>
        <div className="div_two">
            {
                addPrd?
                <div className="container h-100 signup-container mt-5">
            
            <div style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}className="d-flex flex-column justify-content-center px-2 ">
                <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> storeOwner can add product here</p>
                </div>
                <form action="">
                <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputName">name of store</label>
                        <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setUser(e.target.value)} placeholder="  نام کتگوری را وارد کنید  " />
                       
                    </div>
                    <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">path of category </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => pathName(e.target.value)} placeholder="    مسیر رسیدن به کتگوری تان را مشخص کنید" />
                       
                    </div>
                    {
                        notavailableloaded?
                        <button   className="btn btn-primary mb-4 submit-button " onClick={ () => handle_fields()}> add not available product... </button>
                        :
                        <button   className="btn btn-primary mb-4 submit-button " onClick={ () => handle_fields()}> add not available product </button>
                    }
                   
                    {
                        notavailable?
                        <div>
                        <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">{json_field!==null?json_field.fields.split("-")[0]:"not-ready-yet"} </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setfieldone(e.target.value)} placeholder="" />
                        </div>
                        <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">{json_field!==null?json_field.fields.split("-")[1]:"not-ready-yet"} </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setfieldtwo(e.target.value)} placeholder="" />
                        </div>
                        <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">{json_field!==null?json_field.fields.split("-")[2]:"not-ready-yet"} </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setfieldthree(e.target.value)} placeholder="" />
                        </div>
                        <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">{json_field!==null?json_field.fields.split("-")[3]:"not-ready-yet"}  </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setfieldfour(e.target.value)} placeholder="" />
                        </div>
                        <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">name of product </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setesm(e.target.value)} placeholder="enter your wanna name" />
                        </div>
                        </div>
                        :
                        null
                    }
                    <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">price </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setprice(e.target.value)} placeholder=" enter price" />
                       
                    </div>
                    <div className="from-group mb-4">
                        <label className="mb-2" htmlFor="inputEmail">link </label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setlink(e.target.value)} placeholder=" enter link" />
                       
                    </div>
                    </form>
                    {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => addproduct()}> افزودن </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => addproduct()}>  ... در حال افزودن</button>
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
            :null
            }

            {
                addstr?
                <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2" style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}>
        <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> admin can add store here!</p>
                </div>
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName">نام فروشگاه</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setUser(e.target.value)} placeholder="Enter store name" />
                   
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(2)}> افزودن </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  ... در حال افزودن</button>
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
        :null

            }

{
                editprf?
                <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2" style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}>
        <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> storeOwner can edit profile!</p>
                </div>
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName"> نام کاربری جدید</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} placeholder="new username (optional)  " />
                   
                </div>
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">آدرس ایمیل جدید</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="new email (optional)" />
                   
                </div>
                <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputEmail">شماره موبایل جدید</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={(e) => setMobile(e.target.value)} placeholder="  new mobile (optional)  " />
                   
                </div>
                </form>
                {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(3)}> update </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  update...   </button>
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
        :null

            } 
            {
                
                seerepo?
                <div className="container h-100 signup-container mt-5">
            
        <div className="d-flex flex-column justify-content-center px-2" style={{alignContent:"center",justifyContent:"center",alignItems:"center",
                        borderRadius: "25px"}}>
        <div className="ability-container" style={{backgroundColor:"green",width:"50%",marginBottom:"20px"}}>
                    <p> storeOwner can see repos!</p>
                </div>
            <form action="">
            <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName"> نام  فروشگاه</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setUser(e.target.value)} placeholder="new username (optional)  " />
                   
                </div>
                </form>
                    {
                    isLoad === false?
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(4)}> see reports </button>
                    :
                    <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction()}>  see reports...   </button>
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
                        canseeRepo?
                        <div className="div_two">
                           {
                            data!==null?
                            data.map((product) => (
                                <Report key={product.productId} product={product} />
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
        :null
                

            } 

            
            
            
            
        </div>
        </div>
    )
}

export default StoreOwnerPannel;