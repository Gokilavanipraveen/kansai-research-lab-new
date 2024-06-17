// Navbar.js

import React, { useState } from "react";
import "../UserPageComponent/Scss/Navbar.scss";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ images }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [dropdownList, setDropdownList] = useState();
  if (
    (images && filteredCategories === "undefined") ||
    (images && filteredCategories.length === 0)
  ) {
    setFilteredCategories(images);
    const namesArray = images && images?.map((image) => image.category);
    if (namesArray) {
      const uniqueValuesSet = new Set(namesArray);
      const uniqueValuesArray = [...uniqueValuesSet];
      setDropdownList(uniqueValuesArray);
    }
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const history = useHistory();

  return (
    <nav className=" navbar-expand-lg navbar-dark navbar">
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto navbarstyle">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Products" className="nav-link">
              Products
            </Link>
          </li>

          <li className="nav-item">
            <div className="dropdown">
              <button
                onClick={toggleDropdown}
                className="dropdown-toggle nav-link"
              >
                Catagories
              </button>
              {isOpen && (
                <div className="dropdown-menu">
                  <ul>
                    {(images && dropdownList === "undefined") ||
                    (images && dropdownList.length === 0) ? (
                      <li>Empty</li>
                    ) : (
                      dropdownList.map((a) => (
                        <li key={a}>
                          <Link className="nav-link" to={`/page/${a}`}>
                            {a}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
