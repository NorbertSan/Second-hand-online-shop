import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  z-index: 1;
`;

const PhotosGallery = ({ product }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const items = [];
    if (product.images && product.images.length > 0) {
      product.images.forEach((image) =>
        items.push({
          original: `${BASE_URL}/${image}`,
          thumbnail: `${BASE_URL}/${image}`,
        })
      );
    }
    setImages(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.images]);
  return (
    <StyledWrapper>
      <ImageGallery items={images} />
    </StyledWrapper>
  );
};

PhotosGallery.propTypes = {
  product: PropTypes.object.isRequired,
};

export default PhotosGallery;
