// Home page - Rootpath -/home
import { fetchData } from "../Components/API";
import { useState, useEffect } from "react";
import Slider from "../Components/UserPageComponent/Carousel/HeroSlider";
import Sample from "../Sample/aapp";
import Navbar from "../Components/Common/Navbar";
import Categories from "../Components/UserPageComponent/Categories/Category";
function HomePageFunc() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!loading) {
      const getData = async () => {
        try {
          const fetchedData = await fetchData(); // Call the fetchData function
          setData(fetchedData);
          setLoading(true);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [loading]);
  return (
    <>
      {!data ? (
        " Loading............"
      ) : (
        <>
          <Navbar images={data} />
          <div className="contentContainer">
            <Slider images={data} />
            <Categories CategoriesList={data} />
          </div>
        </>
      )}
    </>
  );
}
export default HomePageFunc;
