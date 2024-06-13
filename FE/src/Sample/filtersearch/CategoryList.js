// CategoryItem.js
import React from "react";

const CategoryItem = ({ field }) => {
  return <div>{field.map((a) => a.category)}</div>;
};

export default CategoryItem;
