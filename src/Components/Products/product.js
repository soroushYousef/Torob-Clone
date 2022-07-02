import React from "react";
import { Link } from "react-router-dom";
import * as stuff from "../../stuff";
import {Card,Button} from 'react-bootstrap'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState,filterAndSave,updateCaategory2} from '../redux/reducer'
import Cookies from 'universal-cookie';
import '../StoreOwnerPannel/report.css';
const Product = (prod)=>{
    let p =prod;
    prod = prod.product;
    console.log("prod");
    console.log(prod);
    console.log(prod);
    const dispatch=useDispatch();
    const [isLoad,setIsLoad] = useState(false);
    const [isValid,setisValid]=useState(null);
    const [message,setMessage]=useState(null);
    const [sehat,setSehat]=useState(null);
    const arr_data = useSelector((state)=>state.slice_for_torob.holder);
    const cookies = new Cookies();

   const addToFavorits = async()=>{
    fetch(stuff.serverAddress.concat(`api/user/addproducttofavorite`),{
      method:"POST",
      body: JSON.stringify({
          _id:prod._id
      }),
      headers:{
          "Authorization":`Bearer ${cookies.get("jwt")}`,
          "Content-type" : "application/json;charset=UTF-8"
      }
  }).then(response=>response.json()).then(json=>{
      setisValid(true);
      if(json.error!==undefined){
          console.log("here1");
          setMessage(json.error.message);
          setisValid(false);
      }else{
          setMessage(json.message);
          dispatch(updateCaategory2());   
      }
  });
    
   }
   useEffect(() => {
    setisValid(true);
}, []);

    return(
      <div className="product">
<Card className="product__image">
  <Card.Img variant="top" src="https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png" />
        
  <Card.Body>
   <p onClick={()=>console.log("klid kar kard")}>
    name: {prod.name}
   </p>
   <p>
    price:{prod.price}
   </p>
   <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) =>addToFavorits() }>ADD to Favorits</button>
   { isValid === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                       
                     :null
                    
                    } 
  </Card.Body>
</Card>

      </div>

    )

}
export default Product;