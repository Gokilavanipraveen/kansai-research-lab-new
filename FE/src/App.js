import Logo from "./IMAGELOGO.svg";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import "./Components/UserPageComponent/css/header.css";
import Footer from "./Components/Common/Footer";
import { fetchData } from "./Components/API";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProductPage from "./Pages/ProductPage";
import Navbar from "./Components/Common/Navbar";
import Cart from "./Components/UserPageComponent/ProductCart/Cart";
import LoginConsole from "../src/Components/Admin/admin-console/LoginPageAdmin";
function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!loading) {
      const getData = async () => {
        try {
          const fetchedData = await fetchData();
          setProducts(fetchedData);
          setLoading(true);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [loading]);

  return (
    <>
      <div className="App">
        <Router>
          <header className="app-header">
            <nav className="nav-bar">
              <img src={Logo} className="App-logo" alt="Logo" />
              <Link to="/">
                <h2>KANSAI Research Laboratories</h2>
              </Link>
              <Link to="/cart">
                <div className="nav-bag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-handbag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                  </svg>
                  <span className="bag-quantity">
                    <span>{cartTotalQuantity}</span>
                  </span>
                </div>
              </Link>
            </nav>
          </header>
          <Navbar images={products} />
          <Route exact path="/" render={() => <HomePage data={products} />} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={ProductPage} />
          <Route path="/Login" component={LoginConsole} />
        </Router>

        <Footer />
      </div>
    </>
  );
}

export default App;
