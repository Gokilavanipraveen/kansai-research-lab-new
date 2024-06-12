import React, { useState } from "react";
import CategoryList from "./CategoryList.js";
import Filter from "./filter.js";

const App = ({ images }) => {
  const namesArray = images && images?.map((image) => image.category);
  const [filteredCategories, setFilteredCategories] = useState();
  if (namesArray && !filteredCategories) {
    const uniqueValuesSet = new Set(namesArray);
    const uniqueValuesArray = [...uniqueValuesSet];
    setFilteredCategories(uniqueValuesArray);
  }
  const [filteredCategories1, setFilteredCategories1] = useState([]);
  if (
    (images && filteredCategories1 === "undefined") ||
    (images && filteredCategories1.length === 0)
  ) {
    setFilteredCategories1(images);
  }

  return (
    <div>
      {(images && filteredCategories1 === "undefined") ||
      (images && filteredCategories1.length === 0) ? (
        <p>The array is empty</p>
      ) : (
        <>
          <CategoryList field={filteredCategories1} />
          <Filter
            categories={filteredCategories1}
            setFilteredCategories1={setFilteredCategories1}
          />
        </>
      )}
    </div>
  );
};

export default App;
