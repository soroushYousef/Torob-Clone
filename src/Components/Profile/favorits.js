import React from "react";
import { Link } from "react-router-dom";
import {Card,Button} from 'react-bootstrap'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState,filterAndSave} from '../redux/reducer'
import '../StoreOwnerPannel/report.css';
const Favorits = (prod)=>{
    let p =prod;
    prod = prod.product;
    console.log("prod");
    console.log(prod);
    console.log(prod);
    const dispatch=useDispatch();
    const arr_data = useSelector((state)=>state.slice_for_torob.holder);

    const deletefavorits = async()=>{
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
   <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => dispatch(filterAndSave({arr:arr_data,target:prod._id}))}>delete</button>
  </Card.Body>
</Card>

      </div>

    )

}
export default Favorits;