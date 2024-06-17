import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../Common/Features/cartSlice";
import { useEffect, useState } from "react";
import Axios from "axios";

function ProductCart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    saveData();
  });

  const saveData = async () => {
    const response = await Axios.get("http://localhost:3003/products");
    setData(response.data);
  };

  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  return (
    <div className="home-container container" id="productDetails">
      {status === "success" ? (
        <>
          <h2>Product Details</h2>
          <div className="products row">
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product col-md-4 col-6">
                  <h3>
                    {product.subtitle} - <sub>{product.quantity}</sub>
                  </h3>

                  <img src={product.image} alt={product.title} />
                  <div className="details">
                    Quantity : <span>{product.quantity}</span> <br />
                    Price : <span className="price">{product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
}

export default ProductCart;
