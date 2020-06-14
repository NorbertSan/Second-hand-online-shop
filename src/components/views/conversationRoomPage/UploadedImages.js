import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.section`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    margin-right: 6px;
  }
`;

const UploadedImages = React.memo(
  ({ images: imagesId, removePhoto }) => {
    const [images, setImages] = useState(null);
    useEffect(() => {
      setImages(
        imagesId.map((image, index) => (
          <img
            alt={`upload ${index}`}
            src={`${BASE_URL}/${image}`}
            key={index}
            onClick={() => removePhoto(image)}
          />
        ))
      );
    }, [imagesId, removePhoto]);
    if (!images) return null;
    else return <StyledWrapper>{images}</StyledWrapper>;
  },
  (prevProps, nextProps) => prevProps.images.length === nextProps.images.length
);

UploadedImages.propTypes = {
  images: PropTypes.array.isRequired,
  removePhoto: PropTypes.func.isRequired,
};

export default UploadedImages;
