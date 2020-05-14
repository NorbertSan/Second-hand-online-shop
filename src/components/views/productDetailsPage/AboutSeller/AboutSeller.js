import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import moment from "moment";
import { Link } from "react-router-dom";

// ICONS
import PinIcon from "assets/icons/pin.svg";
import OfflineIcon from "assets/icons/offline.svg";
import UserIcon from "assets/icons/user.svg";
// COMPONENTS
import SellerProducts from "./SellerProducts";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const StyledUserInfo = styled.section`
  display: flex;
  background: #eee;
  padding: 20px 10px;
  border-radius: 5px;
  box-shadow: 0 0 3px ${theme.colors.blackish};
`;
const StyledAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 3px;
  object-fit: cover;
  border: 2px solid ${theme.colors.blackish};
  margin-right: 10px;
`;
const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.blackish};
  div {
    font-size: ${theme.fontSize.s};
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    &.big {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: ${theme.fontSize.m};
    }
  }
`;
const StyledIcon = styled.img`
  width: 13px;
  margin-right: 15px;
`;
const StyledLink = styled(Link)`
  font-style: italic;
  border-bottom: 1px solid ${theme.colors.blackish};
`;

const AboutSeller = ({ authorInfo }) => {
  return (
    <StyledWrapper>
      <StyledUserInfo>
        <StyledAvatar src={UserIcon} alt="user avatar" />
        <StyledDetails>
          <div className="big">
            <StyledIcon src={UserIcon} alt="user icon" />
            <StyledLink to={`/user/${authorInfo.nickName}`}>
              {authorInfo.nickName}
            </StyledLink>
          </div>
          <div>
            <StyledIcon src={PinIcon} alt="pin icon" />
            <span>{authorInfo.location}</span>
          </div>
          <div>
            <StyledIcon src={OfflineIcon} alt="offline icon" />
            <span>Online : {moment(new Date()).fromNow()}</span>
          </div>
        </StyledDetails>
      </StyledUserInfo>
      <SellerProducts
        nickName={authorInfo.nickName}
        productsIds={authorInfo.products}
      />
    </StyledWrapper>
  );
};

AboutSeller.propTypes = {
  authorInfo: PropTypes.object.isRequired,
};

AboutSeller.propTypes = {
  authorInfo: PropTypes.object.isRequired,
};

export default AboutSeller;
