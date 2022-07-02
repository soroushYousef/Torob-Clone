import { useState, useEffect, useRef } from "react";
import { Link,useNavigate ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import  {changeLoginState,filterAndSave,updateCaategory1} from '../redux/reducer'
import Dropdown from "./Dropdown";

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
 
  const getProductOfThisCategory = (sb)=>{
    navigate('/productCategory',{replace:true,state:sb});
  }
  const handle_click= ()=>{
    setDropdown((prev) => !prev);
    console.log("which menu");
    console.log(items);
    console.log("which menu1");
    getProductOfThisCategory(items);
    dispatch(updateCaategory1());
  }

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.subQueries&&items.subQueries.length!==0 ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => handle_click()}
          >
            {items.name}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.subQueries}
            dropdown={dropdown}
          />
        </>
      ) : (
        <a href=""onClick={()=>getProductOfThisCategory(items)}>{items.name} </a>
      )}
    </li>
  );
};

export default MenuItems;
