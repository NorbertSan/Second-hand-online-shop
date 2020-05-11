import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 140px;
`;

const ImageSlider = ({ images }) => {
  return (
    <Carousel showThumbs={false}>
      {images &&
        images.map((image, index) => (
          <StyledImage
            key={`product-photo ${index}`}
            src={`http://localhost:5000/${image}`}
          />
        ))}
    </Carousel>
  );
};
ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageSlider;
