import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Card,Button} from 'react-bootstrap'
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../StoreOwnerPannel/report.css';
const Favorits = (prod)=>{
    let p =prod;
    prod = prod.product;
    console.log("prod");
    console.log(prod);
    console.log(prod);
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
   <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => {}}>delete</button>
  </Card.Body>
</Card>

      </div>

    )

}
export default Favorits;