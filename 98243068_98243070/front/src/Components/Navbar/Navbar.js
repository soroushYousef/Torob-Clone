import {Link} from "react-router-dom"
import * as stuff from '../../stuff'
import Cookies from 'universal-cookie';
import { menuItems } from "../menuitems";
import MenuItems from "./MenuItems";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {React,useEffect,useState} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState} from '../redux/reducer'
import {Navbar,Nav,Container,Button,NavDropdown} from 'react-bootstrap'
import './Navbar.css';

const Navbar_com = () => {
    const cookies = new Cookies();
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin] = useState(null);
    const[isStoreOwner,setisStoreOwner] = useState(null);
    const login = useSelector((state)=>state.slice_for_torob.login);
    const update = useSelector((state)=>state.slice_for_torob.update);
    const [isValid,setisValid]=useState(null);
    const [ sehat,setSehat]=useState(null);
    const [message,setMessage]=useState(null);
    const[data,setData]=useState(null);
    console.log(login);
    const handle_pannel = async() =>{
        try{
            if(cookies.get("isAdmin")==="true"){
                console.log("tainja");
                navigate('/adminPannel',{replace:true});
            }else{
                navigate('/storeOwnerPannel',{replace:true});
            }
       
        }catch(error) {
            console.log(error);
        }
    }
    const get_main_categories = async ()=>{
        fetch(stuff.serverAddress.concat('api/category/getSubQueries'),{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            setisValid(true);
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                console.log(json.reoprts);
                setMessage(json.error.message);
                setisValid(false);
            }else{
                setMessage(json.message);
                setData(json.subCategories);   
            }
        });
    }
    useEffect(() => {
        get_main_categories();
      if(login===true){
        console.log(cookies.get('isAdmin'))
        if(cookies.get('isAdmin')!==undefined&&cookies.get('isAdmin')==="true"){
            console.log("hhhhj");
            setIsAdmin(true);
        }else if(cookies.get('isStoreOwner')!==undefined&&cookies.get('isStoreOwner')==="true"){
            setisStoreOwner(true);
        }

      }
    }, [update]);
    
    return (
       

<Navbar  class="overflow-visible" style={{width:"100%"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
<Container style={{display:"flex",flexDirection:"row",height:"fit-content",justifyContent:"first"}}>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="me-auto">
    {  !login?
                    <div className="div_flex">
                        <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}>ثبت نام </Link> </a>
                        <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNIN}> ورود </Link> </a>
                    </div>
                        
                    :
                    <div className="div_flex">
                        <div >
                        <button type="submit" style={{margin:"10px auto",backgroundColor:"purple",width:"80px",height:"50px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => navigate('/userProfile',{replace:true})}>profile</button>
                        </div>
                        <div>
                            <button type="submit" style={{margin:"10px auto",backgroundColor:"purple",width:"80px",height:"50px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => dispatch(changeLoginState())}>  <Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}>signout  </Link></button>
                        </div>
                        <div>
                            <button type="submit" style={{margin:"10px auto",backgroundColor:"purple",width:"80px",height:"50px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => dispatch(changeLoginState())}>  <Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNIN}>signin  </Link></button>
                        </div>
                        {
                            cookies.get("isAdmin")==="true"||cookies.get("isStoreOwner")==="true"?
                            <button type="submit" style={{margin:"10px auto",backgroundColor:"purple",width:"80px",height:"50px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => handle_pannel()}>  pannel  </button>
                            :
                            null
                        }
                        
                        

                    </div>
                    
                    
                }
  
  {
          data?
          data.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        }):null
    
    }

    
  </Nav>
  
</Navbar.Collapse>
</Container>
</Navbar>
      


        
       
    )
}



export default Navbar_com;