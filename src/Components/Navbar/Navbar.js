import {Link} from "react-router-dom"
import * as stuff from '../../stuff'
import Cookies from 'universal-cookie';
import axios from "axios";
import {React,useEffect,useState} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState} from '../redux/reducer'
import './Navbar.css';

const Navbar = () => {
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
      if(login===true){
        console.log(cookies.get('isAdmin'))
        if(cookies.get('isAdmin')!==undefined&&cookies.get('isAdmin')==="true"){
            console.log("hhhhj");
            setIsAdmin(true);
        }else if(cookies.get('isStoreOwner')!==undefined&&cookies.get('isStoreOwner')==="true"){
            setisStoreOwner(true);
        }

      }
    }, [login]);
    
    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {
                    !login?
                    <div>
                        <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}>ثبت نام </Link> </a>
                        <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNIN}> ورود </Link> </a>
                    </div>
                        
                    :
                    <div className="div_flex">
                        <div >
                        <button type="submit" style={{marginLeft:"10px",backgroundColor:"gray",width:"80px",height:"60px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => dispatch(changeLoginState())}>  <Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}> profile  </Link></button>
                        </div>
                        <div>
                            <button type="submit" style={{marginLeft:"10px",backgroundColor:"gray",width:"80px",height:"60px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => dispatch(changeLoginState())}>  <Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}>signout  </Link></button>
                        </div>
                        <div>
                            <button type="submit" style={{marginLeft:"10px",backgroundColor:"gray",width:"80px",height:"60px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => console.log("sign in")}>  <Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNIN}>signin  </Link></button>
                        </div>
                        {
                            cookies.get("isAdmin")==="true"||cookies.get("isStoreOwner")==="true"?
                            <button type="submit" style={{marginLeft:"10px",backgroundColor:"gray",width:"80px",height:"60px"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => handle_pannel()}>   پنل کاربری  </button>
                            :
                            null
                        }
                        
                        

                    </div>
                    
                    
                }
               
                <div className="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link me-4 active" href="#">Home <span class="sr-only">(current)</span></a>
                    <a className="nav-item nav-link me-4" href="#">Features</a>
                    <a className="nav-item nav-link me-4" href="#">Pricing</a>
                    <a className="nav-item nav-link me-4" href="#">Disabled</a>
                    </div>
                </div>
            </nav>

        </div>
    )
}



export default Navbar;