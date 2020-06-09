import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 140px;
`;

const ImageSlider = ({ images: imagesId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(
      imagesId.map((image, index) => (
        <StyledImage
          key={`product-photo ${index}`}
          src={`${BASE_URL}/${image}`}
        />
      ))
    );
  }, [imagesId]);

  return <Carousel showThumbs={false}>{images}</Carousel>;
};
ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageSlider;
