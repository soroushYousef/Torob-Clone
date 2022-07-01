import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Card,Button} from 'react-bootstrap'
import { useState } from "react";
import { useParams } from "react-router-dom";
import './report.css';
const Report = (prod)=>{
    let p =prod;
    prod = prod.product;
    console.log(prod);
    return(
      <div className="product">
<Card className="product__image">
  <Card.Img variant="top" src="https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png" />
        <p>
            description: {prod.description}
        </p>
  <Card.Body>
   <p>
    productName: {prod.productName}
   </p>
   <p>
    productpath:{prod.productCategorypath}
   </p>
   <p>
    productpath:{prod.productCategorypath}
   </p>
   <button type="submit"  className="btn btn-primary mb-4 submit-button " onClick={ (e) => {}}>Check</button>
  </Card.Body>
</Card>

      </div>

    )

}
export default Report;