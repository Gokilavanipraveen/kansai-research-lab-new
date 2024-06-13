// Filter.js
import React, { useState } from "react";

const Filter = ({ categories, setFilteredCategories1 }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = categories.filter((a) =>
      a.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategories1(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search categories"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default Filter;
