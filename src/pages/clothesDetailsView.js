import React from "react";
import styled from "styled-components";

// COMPONENTS
import PhotosGallery from "components/molecules/PhotosGallery";
import TagsSection from "components/molecules/TagsSection";
import ClothesItemSummary from "components/molecules/ClothesItemSummary";
import Button from "components/atoms/Button";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledButton = styled(Button)`
  margin: 7px 0;
  width: 60%;
  align-self: center;
`;

const ClothesDetailsView = () => {
  return (
    <StyledWrapper>
      <PhotosGallery />
      <TagsSection />
      <ClothesItemSummary />
      <StyledButton>Buy Now</StyledButton>
      <StyledButton secondary>Add to favourites</StyledButton>
    </StyledWrapper>
  );
};

export default ClothesDetailsView;
