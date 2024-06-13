import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  console.log("feasfgjfghsfgsghdg");
  const { id } = useParams();

  // Fetch product details based on id
  console.log(id);

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
      {/* Display other details of the product */}
    </div>
  );
}

export default ProductDetail;
