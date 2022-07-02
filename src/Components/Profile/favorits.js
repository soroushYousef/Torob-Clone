import React from "react";
import { Link } from "react-router-dom";
import * as stuff from "../../stuff";
import {Card,Button} from 'react-bootstrap'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState,filterAndSave} from '../redux/reducer'
import Cookies from 'universal-cookie';
import '../StoreOwnerPannel/report.css';
const Favorits = (prod)=>{
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

    const deletefavorits = async()=>{
        console.log("here1");
        console.log(prod._id);
        setIsLoad(true);
        fetch(stuff.serverAddress.concat('api/user/deleteFavorite'),{
            method:"DELETE",
            body: JSON.stringify({
                _id:prod._id
            }),
            
            
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
               
                setMessage(json.error.message);
                setIsLoad(false);
                setisValid(false);
               
            }else{
                setMessage(json.message);
                console.log(json);
                dispatch(filterAndSave({arr:arr_data,target:prod._id}));
                
                
            }
        });

    }
    const handler_our = ()=>{
        deletefavorits();
        
        
    }

    return(
      <div className="product">
<Card className="product__image">
  <Card.Img variant="top" src="https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png" />
        <p>
            link: {prod.link}
        </p>
  <Card.Body>
   <p>
    name: {prod.name}
   </p>
   <p>
    productpath:{prod.pathCategory}
   </p>
   <p>
    price:{prod.price}
   </p>
   <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) =>handler_our() }>delete</button>
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
  </Card.Body>
</Card>

      </div>

    )

}
export default Favorits;