import React from "react";
import styled from "styled-components";
import theme from "utils/theme";

// COMPONENTS
import UserIcon from "components/atoms/UserIcon";
import NickName from "components/atoms/NickName";
import LikeButton from "components/molecules/LikeButton";
// ASSETS
import IconUser from "assets/icons/userIcon.svg";
import dummyPhoto from "assets/images/dummyPhoto.jpg";

const StyledWrapper = styled.li`
  margin-bottom: 25px;
  width: 170px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0px;
    height: 10px;
    width: 2px;
    background: ${theme.colors.primary};
  }
  &:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0;
    height: 2px;
    width: 10px;
    background: ${theme.colors.primary};
  }
`;
const StyledAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
`;
const StyledUserIcon = styled(UserIcon)`
  margin-right: 5px;
`;
const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
`;
const StyledProductInformation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  span {
    color: grey;
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
    margin-bottom: 3px;
  }
`;

const ClothesItem = () => {
  return (
    <StyledWrapper>
      <StyledAuthorInfo>
        <StyledUserIcon src={IconUser} alt="user icon" />
        <NickName>norbasss</NickName>
      </StyledAuthorInfo>
      <StyledImage src={dummyPhoto} alt="clothes image" />
      <StyledProductInformation>
        <LikeButton />
        <span>14.99 zł</span>
        <span>M/38/40</span>
        <span>Bershka</span>
      </StyledProductInformation>
    </StyledWrapper>
  );
};

export default ClothesItem;
