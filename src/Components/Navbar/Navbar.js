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
    useEffect(() => {
        console.log(login+" "+"defgchvjkl");
      if(login===true){
        console.log(cookies.get('isAdmin'))
        if(cookies.get('isAdmin')!==undefined&&cookies.get('isAdmin')==="true"){
            console.log("hhhhj");
            setIsAdmin(true);
        }else if(cookies.get('isStoreOwner')!==undefined&&cookies.get('isStoreOwner')==="true"){
            setisStoreOwner(true);
        }

      }
    }, []);
    
    return (
        <Navbar  style={{width:"100%"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container style={{display:"flex",flexDirection:"row",alignItems:"center",alignContent:"left",justifyContent:"left"}}>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          {
                    !login?
                    <div>
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
                        {
                            cookies.get("isAdmin")==="true"||cookies.get("isStoreOwner")==="true"?
                            <button type="submit" style={{margin:"10px auto",backgroundColor:"purple",width:"80px",height:"50px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => handle_pannel()}>  pannel  </button>
                            :
                            null
                        }
                        
                        

                    </div>
                    
                    
                }
          {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
        
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>


        
       
    )
}



export default Navbar_com;