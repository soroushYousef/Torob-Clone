import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Card,Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import * as stuff from '../../stuff';
import './detail.css'
import { addToCart } from "../redux/reducer";
import {useSelector} from 'react-redux'
import { useEffect,useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import '../StoreOwnerPannel/report.css'
const Single_product_detail = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [data,setData]=useState(null);
    const [sehat,setsehat]=useState(null);
    const [sehat1,setsehat1]=useState(null);
    const [isValid,setisValid]=useState(null);
    const [isValid1,setisValid1]=useState(null);
    const [message,setMessage]=useState(null);
    const [first_check,setfirst]=useState(false);
    const [second_check,setsecond]=useState(false);
    const [report,setreport]=useState(null);
    const [whichproduct,setwhp]=useState(null);
    const [whichstr,setstr]=useState(null);
    const cookies = new Cookies();
    console.log("khab");
    console.log(location.state);
    const reportsubmit = async ()=>{
        if(first_check===false&&second_check===false&&report===null){
            setMessage('chizi select nashode!');
            setisValid1(false);
          setTimeout(() => {
            setisValid1(true);
            setreport(null);
          }, 4000);
        }
        setwhp(null);
        setstr(null);
        setreport(null);
        fetch(stuff.serverAddress.concat('api/user/report'),{
            method:"POST",
            body: JSON.stringify({
                store_id: whichstr,
                product_id:whichproduct,
                description :report
            }),
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                setMessage(json.error.message);
                console.log(json);
                setisValid(false);
          setTimeout(() => {
            setisValid(true);
          }, 4000);
            }else{
              
               console.log("nmishe yani?");
               console.log(json);
               console.log("mishe yani?");
               setMessage(json.message); 
               setsehat(true);
          setTimeout(() => {
            setsehat(false);
          }, 4000);   
            }
        });

    }
    const getStores = async()=>{
        fetch(stuff.serverAddress.concat('api/user/getProduct'),{
            method:"POST",
            body: JSON.stringify({
                name:location.state.product.name,
                path:location.state.product.pathCategory
            }),
            headers:{
                "Authorization":`Bearer ${cookies.get("jwt")}`,
                "Content-type" : "application/json;charset=UTF-8"
            }
        }).then(response=>response.json()).then(json=>{
            console.log(json);
            if(json.error!==undefined){
                console.log("here1");
                setMessage(json.error.message);
                console.log(json);
                setisValid(false);
          setTimeout(() => {
            setisValid(true);
          }, 4000);
            }else{
               setData(json);
               console.log("nmishe yani?");
               console.log(json);
               console.log("mishe yani?");
               setMessage(json.message); 
               setsehat(true);
          setTimeout(() => {
            setsehat(false);
          }, 4000);   
            }
        });
    }
    useEffect(() => {
      getStores();
      
    }, []);
    const click_report=(p_id,s_id)=>{
        setShow(true);
        setwhp(p_id);
        setstr(s_id);
    }
    return (
        <>
         { isValid === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                      
                     :null
                    
                    }
        <div className={"single_item_detail"}>
        <img
          className={"single_Item__image"}
          src="https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png"
         
        />
        <div className={"singleItem__details"}>
        <p className={"font_single_item"}><em style={{color:"purple"}}>Name : </em>{data?location.state.product.name:<p>loading</p>}</p>
          <p className={"font_single_item"}><em style={{color:"purple"}}>Range :  </em> {data?data.lowPrice:<p>loading</p>}$ to : {data?data.maxPrice:<p>loading</p>}$</p>
          <p className={"font_single_item"}><em style={{color:"purple"}}>fields:</em>{data?location.state.product.fields:<p>loading</p>}</p>
  
        </div>

       
      </div>
      
      <div className="for_stores">
      <div className={"for_stores"}>
            {
                data?
                
                    data.products_with_diff_stores.map(st=>{
                        return <div>
                        <div className="product">
                        <Card className="product__image">
                          <Card.Img variant="top" src="https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png" />
                          <Card.Body>
                           <p>
                            <em style={{color:"purple"}}>store name</em> :{st.store.name}
                           </p>
                           <p>
                           <em style={{color:"purple"}}>price : </em>:{st.product_price}
                           </p>
                           <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => {window.open(st.store.link, '_blank', 'noopener,noreferrer');}}>BUY</button>
                           <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => {click_report(st.product_id,st.store._id)}}>report</button>
                          </Card.Body>
                        </Card>
                        
                              </div>
                              </div>
                            
                       
                    })
                
                :
                null
            }
  
        </div>
      </div>
     
      
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
            <form class="w3-container w3-card-4">
            <h2>whats problem ?</h2>
                 <p>
                 <input class="w3-check" type="checkbox"  onChange={()=>{setfirst(first_check===true?true:false)}}></input>
                 <label>non-related product</label></p>
                 <p>
                 <input class="w3-check" type="checkbox"  onChange={()=>{setsecond(second_check===true?true:false)}}></input>
                 <label>price-problem</label></p>
                 <div className="from-group mb-4">
                    <label className="mb-2" htmlFor="inputName"> گزارش دیگر</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" onChange={(e) => setreport(e.target.value)} placeholder="گزارش خود را وارد کنید" />
                   
                </div>
                
                
                </form>
                <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => {reportsubmit()}}>submit report</button>
                { isValid1 === false ? 
                        <div class="alert alert-danger" role="alert">
                            <p>{message}</p>
                         </div>
                        : sehat1?
                                <div style={{backgroundColor:"green"}}>
                                    <p>{message}</p>
                                </div>
                     :null
                    
                    }
            
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>    
        </>
      
      


      
    );
  }
  export default Single_product_detail