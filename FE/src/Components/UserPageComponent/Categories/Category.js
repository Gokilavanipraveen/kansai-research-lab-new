import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = ({ CategoriesList }) => {
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
  }, [loading]);

  useEffect(() => {
    if (categoriesData) {
      const distinctArray = [
        ...new Set(
          categoriesData.map((item) => `${item.category},${item.image}`)
        ),
      ].map((item) => {
        const [category, image] = item.split(",");
        return { category, image };
      });
      setFilteredCategoriesList(distinctArray);
    }
  }, [categoriesData]);
  return (
    <>
      <div className="cardComponent container">
        <div className="row g-3">
          <h2 align="center">Categories</h2>
          {filteredCategoriesList &&
            filteredCategoriesList?.map((item) => {
              return (
                <div className="col-md-4 col-6">
                  <div className="card" key={item.category}>
                    <Link to={`/collections/${item.category}`}>
                      <img
                        className="card-img-top img-fit"
                        src={item.image}
                        alt={item.category}
                      />

                      {item.category}
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Categories;
