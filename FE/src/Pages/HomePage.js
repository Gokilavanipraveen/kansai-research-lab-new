// Home page - Rootpath -/home

import Slider from "../Components/UserPageComponent/Carousel/HeroSlider";
import Categories from "../Components/UserPageComponent/Categories/Category";
import ProductDetail from "../Components/UserPageComponent/Categories/ProductDetail";
import { TailSpin } from "react-loader-spinner";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Components/UserPageComponent/Scss/HomePage.scss";
function HomePageFunc({ data }) {
  return (
    <>
      {!data ? (
        <div className="spinner">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="contentContainer">
            <Router>
              <Route exact path="/" render={() => <Slider images={data} />} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Categories CategoriesList={data} />}
                />
                <Route path="/collections/:id" component={ProductDetail} />
              </Switch>
            </Router>
          </div>
        </>
      )}
    </>
  );
}
export default HomePageFunc;
