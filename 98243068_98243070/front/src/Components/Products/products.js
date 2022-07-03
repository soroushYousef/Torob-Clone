import {React,useEffect,useState} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import * as stuff from "../../stuff";
import Cookies from 'universal-cookie';
import './Allproducts.css';
import Product from "./product";
import { useSelector, useDispatch } from "react-redux";

function Products() {
    const location = useLocation();
    const navigate = useNavigate();
    const[data,setData]=useState(null);
    const update = useSelector((state)=>state.slice_for_torob.update1);
    const cookies = new Cookies();
    const get_product_categories =async ()=>{
        fetch(stuff.serverAddress.concat(`api/categoryProduct/getProducts?productCategory=${location.state.path}`),{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                console.log(json.reoprts);
            }else{
               setData(json);
               console.log("nmishe yani?");
               console.log(location.state.path);
               console.log(json);
               console.log("mishe yani?");  
            }
        });
    }
    useEffect(() => {
        console.log("hook");
        console.log(location.state);
        get_product_categories();
      
    }, [update]);

    const filter_products = async(for_query)=>{
        fetch(stuff.serverAddress.concat(`api/categoryProduct/filter?order=${for_query}&productCategory=${location.state.path}`),{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                console.log(json.reoprts);
            }else{
               setData(json);
               console.log("nmishe yani?");
               console.log(json);
               console.log("mishe yani?");  
            }
        });
    }

    const submitAction = (which)=>{
        if(which===1){
            filter_products('cheap');
        }else if(which===2){

            filter_products('expensive');
        }else{
            filter_products('newest');
        }
    }
   
  return (
    <div className="result_search">
         <div className={"products_in_cat"}>
            {data!==null?data.products.map((product) => (
            <Product key={product._id} product={product} />
            )):<p>loading</p>}
         </div>
         <div className="filter_product">
            <button type="submit" style={{width:"80%",backgroundColor:"purple",margin:"10px auto"}} className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(1)}> cheapest </button>
            <button type="submit" style={{width:"80%",backgroundColor:"purple",margin:"10px auto"}} className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(2)}>  most expensive </button>
            <button type="submit"style={{width:"80%",backgroundColor:"purple",margin:"10px auto"}}  className="btn btn-primary mb-4 submit-button " onClick={ (e) => submitAction(3)}> newest </button>
         </div>
    </div>
   
  );
}

export default Products;
