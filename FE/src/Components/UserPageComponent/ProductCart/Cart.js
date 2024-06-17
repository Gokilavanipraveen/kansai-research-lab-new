import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../Common/Features/cartSlice";
import "../css/Cart.css";
import { Link } from "react-router-dom";
import BannerComponent from "../Banner/Banner";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const finalCart = useSelector((state) =>
    state.cart.cartItems.map(
      (cartItem) =>
        " *************** Order Product - " +
        cartItem.subtitle +
        " , Order Price/" +
        cartItem.quantity +
        "iter - " +
        cartItem.price +
        " , Order Quantity Of Item - " +
        cartItem.cartQuantity +
        " , Order Price quantity - " +
        cartItem.price +
        "*" +
        cartItem.cartQuantity +
        "=" +
        cartItem.price * cartItem.cartQuantity +
        "********************"
    )
  );
  const onSubmit = (e) => {
    //   console.log(orderName, orderPhoneNumber);
    const confirmBox = window.confirm(
      "Do you really want to order below items?"
    );
    if (confirmBox === true) {
      window.open(
        "https://wa.me/+918220328391" +
          "?text=Hello Sir willing to place the order" +
          finalCart +
          "ORDERED BY - " +
          orderName +
          " ----- " +
          orderPhoneNumber
      );
    }
  }; //
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const [orderName, setOrderName] = useState();
  const [orderPhoneNumber, setOrderPhoneNumber] = useState();
  //const inputRef = useRef(null);
  return (
    <>
      <BannerComponent />
      <div className="cart-container">
        <form onSubmit={handleSubmit}>
          <div className="order Person details">
            <h2>order details</h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
              />
              <br />
            </div>
            <div>
              <input
                type="tel"
                name="phno"
                placeholder="Phone Number"
                required
                value={orderPhoneNumber}
                onChange={(e) => setOrderPhoneNumber(e.target.value)}
              />
            </div>
            <br />
          </div>
          <button type="submit">Submit</button>
        </form>
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/products#productDetails">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="orderquantity">Order Item Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div
                    className="cart-item"
                    data-field={cartItem.id}
                    key={cartItem.id}
                  >
                    <div className="cart-product">
                      <img src={cartItem.image} alt={cartItem.title} />
                      <div>
                        <h3>{cartItem.title}</h3>
                        <p>{cartItem.subtitle}</p>
                        <button onClick={() => handleRemoveFromCart(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">{cartItem.price}</div>
                    <div className="">{cartItem.quantity}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(cartItem)}>
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      {cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">{cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button onClick={(e) => onSubmit()}>Check out </button>
                <div className="continue-shopping">
                  <Link to="/products">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  function handleSubmit(event) {
    event.preventDefault();
  }
};
export default Cart;
