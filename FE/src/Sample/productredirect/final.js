import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

function Final() {
  return (
    <>
      <h2>fkdjfhd</h2>
      <Router>
        <Switch>
          <Route exact path="/Products" component={ProductList} />
          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
      </Router>
    </>
  );
}

export default Final;
