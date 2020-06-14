import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 50px;
    margin-right: 5px;
    transition: transform 0.3s ease-in-out;
    &.zoom {
      transform: scale(3);
      box-shadow: 0 0 3px grey;
    }
  }
`;

const SentImages = ({ images: imagesId }) => {
  const [images, setImages] = useState(null);
  const toggleZoom = (e) => {
    if (e.target.classList.contains("zoom")) e.target.classList.remove("zoom");
    else e.target.classList.add("zoom");
  };
  useEffect(() => {
    setImages(
      imagesId.map((image, index) => (
        <img
          alt={`upload ${index}`}
          src={`${BASE_URL}/${image}`}
          key={index}
          onClick={toggleZoom}
        />
      ))
    );
  }, [imagesId]);
  if (imagesId.length === 0) return null;
  else return <StyledWrapper>{images}</StyledWrapper>;
};

SentImages.propTypes = {
  images: PropTypes.array.isRequired,
};

export default SentImages;
