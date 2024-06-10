import React from "react";
import { Carousel } from "react-bootstrap";
import "../Scss/HeroSlider.scss";

const HeroSlider = ({ images }) => {
  return (
    <>
      <Carousel className="slidercontainer">
        {images &&
          images.map((item, index) => (
            <Carousel.Item
              interval={3000}
              className="itemcontainer"
              key={index}
            >
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.subtitle}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default HeroSlider;
