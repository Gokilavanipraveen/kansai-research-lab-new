// Filter.js
import React, { useState } from "react";

const Filter = ({ categories, setFilteredCategories }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = categories.filter((a) =>
      a.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategories(filtered);
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
