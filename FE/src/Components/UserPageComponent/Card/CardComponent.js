import "../css/CardComponent.css";
import "bootstrap/dist/css/bootstrap.css";
import Popup from "./popup/popup";
import { useEffect, useState } from "react";
import Axios from "axios";

const Card = () => {
  const [isOpen1, setIsOpen] = useState(false);
  const [currentproduct, setCurrentproduct] = useState();
  useEffect(() => {
    saveData();
  });
  const [products, setProducts] = useState([]);
  const saveData = async () => {
    const response = await Axios.get("http://localhost:3003/products");
    setProducts(response.data);
  };

  const togglePopup = (image) => {
    setIsOpen(!isOpen1);
    setCurrentproduct(image);
  };
  const togglePopup1 = () => {
    setIsOpen(!isOpen1);
  };
  return (
    <div className="cardComponent container">
      <div className="row g-3">
        <h2 align="center">Categories</h2>
        {products &&
          products?.map((image) => {
            return (
              <div className="col-md-4 col-6">
                <div className="card" key={image.id}>
                  <img
                    className="card-img-top img-fit"
                    src={image.image}
                    alt="card"
                  />
                  <div className="card-body">
                    <h2 className="card-title">{image.title}</h2>
                    <p className="card-text">{image.subtitle}</p>
                    <div className="text-end">
                      <input
                        className="btn  btn-primary"
                        type="button"
                        value="View Details"
                        //onClick={togglePopup(image.id)}
                        onClick={() => togglePopup(image)}
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
            );
          })}
      </div>
    </div>
  );
};
export default Card;
