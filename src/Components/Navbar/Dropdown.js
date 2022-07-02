import MenuItems from "./MenuItems";
import { Link,useNavigate ,useLocation} from "react-router-dom";
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const navigate = useNavigate();
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`} >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel}  />
      ))}
    </ul>
  );
};

export default Dropdown;
