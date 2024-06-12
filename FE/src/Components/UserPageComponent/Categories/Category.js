import { useState, useEffect } from "react";

const Categories = ({ CategoriesList }) => {
  console.log(CategoriesList);
  const [categoriesData, setCategoriesData] = useState();
  const [filteredCategoriesList, setFilteredCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading && CategoriesList) {
      const extractedArray = CategoriesList.map((item) => ({
        category: item.category,
        image: item.image,
      }));
      setCategoriesData(extractedArray);
      setLoading(true);
    }
    console.log("categoriesData", categoriesData);
  }, [loading]);

  useEffect(() => {
    if (categoriesData) {
      const distinctArray = [
        ...new Set(
          categoriesData.map((item) => `${item.category}-${item.image}`)
        ),
      ].map((item) => {
        const [category, image] = item.split("-");
        return { category, image };
      });
      setFilteredCategoriesList(distinctArray);
    }
    console.log("filteredCategoriest", filteredCategoriesList);
  }, [categoriesData]);
  console.log("filteredCategoriesList", filteredCategoriesList);
  return (
    <>
      <h2>Categories</h2>
    </>
  );
};
export default Categories;
