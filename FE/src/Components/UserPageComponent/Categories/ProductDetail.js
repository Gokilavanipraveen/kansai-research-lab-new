import React, { useState, useEffect } from "react";
import Popup from "../../Common/popup/popup";
import { useHistory, useParams, useLocation } from "react-router-dom";
function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(window.location.pathname);
  }, [location.pathname]);

  const pathSegments = window.location.pathname.split("/");

  // Get the last segment from the pathSegments array
  const lastSegment = pathSegments[pathSegments.length - 1];
  const apiUrl = `http://localhost:3003/products?category=${lastSegment}`;

  const [responseJson, setResponseJson] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!loading) {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResponseJson(data);
        setLoading(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const [isOpen1, setIsOpen] = useState(false);
  const [currentproduct, setCurrentproduct] = useState();
  const togglePopup = (image) => {
    setIsOpen(!isOpen1);
    setCurrentproduct(image);
  };
  const togglePopup1 = () => {
    setIsOpen(!isOpen1);
  };
  return (
    <div>
      <h2>hfkjsdghfh </h2>
      {responseJson &&
        responseJson?.map((product, index) => {
          return (
            <div key={index}>
              <div className="col-md-4 col-6">
                <div className="card" key={product.id}>
                  <img
                    className="card-img-top img-fit"
                    src={product.image}
                    alt="card"
                  />
                  <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="card-text">{product.subtitle}</p>
                    <div className="text-end">
                      <input
                        className="btn  btn-primary"
                        type="button"
                        value="View Details"
                        //onClick={togglePopup(image.id)}
                        onClick={() => togglePopup(product)}
                      />
                      {isOpen1 && (
                        <Popup
                          content={
                            <div className="container popupContent">
                              <img
                                src={currentproduct.image}
                                alt="popupContent"
                              />
                              <div className="currentproduct">
                                <h2>{currentproduct.subtitle}</h2>
                                <p>{currentproduct.description}</p>
                                <p>
                                  Dilution / {currentproduct.quantity} -
                                  {currentproduct.dilution}
                                </p>
                              </div>
                            </div>
                          }
                          handleClose={togglePopup1}
                        />
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <button onClick={goBack}>Previous Page</button>
    </div>
  );
}

export default ProductDetail;
