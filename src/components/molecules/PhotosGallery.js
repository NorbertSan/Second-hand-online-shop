import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import styled from "styled-components";
import dummyPhoto from "assets/images/dummyPhoto.jpg";

const StyledWrapper = styled.div`
  width: 200px;
  margin: auto;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const PhotosGallery = () => {
  return (
    <StyledWrapper>
      <Zoom>
        <img alt="that wanaka tree" src={dummyPhoto} width="100%" />
      </Zoom>
    </StyledWrapper>
  );
};
export default PhotosGallery;
