// Home page - Rootpath -/home
import { fetchData } from "../Components/API";
import { useState, useEffect } from "react";
import Slider from "../Components/UserPageComponent/Carousel/HeroSlider";

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
      <Slider images={data} />
    </>
  );
}
export default HomePageFunc;
