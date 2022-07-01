import {Link} from "react-router-dom"
import * as stuff from '../../stuff'

const Navbar = () => {
    return (
        <div className="navbar-container">
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNUP}>ثبت نام </Link> </a>
                <a className="nav-item nav-link  ms-4 border"><Link style={{textDecoration : 'none' , color : 'black'}} to={stuff.SIGNIN}> ورود </Link> </a>
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