import React from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../Components/API";
import { useState, useEffect } from "react";
function ProductList() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      const getData = async () => {
        try {
          const fetchedData = await fetchData(); // Call the fetchData function
          setProducts(fetchedData);
          setLoading(true);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [loading]);
  //console.log(products);
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.category}>
            <div className="col-md-4 col-6">
              <div className="card" key={product.category}>
                <img
                  className="card-img-top img-fit"
                  src={product.image}
                  alt={product.category}
                />

                <Link to={`/product/${product.category}`}>
                  {product.category}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
