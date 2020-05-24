import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import moment from "moment";
import { Link } from "react-router-dom";
// ICONS
import PinIcon from "assets/icons/pin.svg";
import UserIcon from "assets/icons/user.svg";
// COMPONENTS
import UserProducts from "components/user/UserProducts";
import DefaultAvatar from "utils/DefaultAvatar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
const StyledUserInfo = styled.section`
  display: flex;
  background: #eee;
  padding: 20px 10px;
  border-radius: 5px;
  box-shadow: 0 0 1px ${theme.colors.blackish};
`;
const StyledAvatar = styled.img`
  width: 80px;
  height: 80px;
  padding: 1px;
  border: 1px solid ${theme.colors.blackish};
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;
const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.blackish};
`;
const StyledIcon = styled.img`
  width: 13px;
  margin-right: 15px;
`;
const StyledLink = styled(Link)`
  font-style: italic;
  border-bottom: 1px solid ${theme.colors.blackish};
`;
const StyledDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 15px;
  &.green {
    background: ${theme.colors.greenish};
  }
  &.red {
    background: ${theme.colors.redish};
  }
`;
const StyledSingleInfo = styled.div`
  font-size: ${theme.fontSize.s};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  &.big {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: ${theme.fontSize.m};
  }
`;
const StyledOnlineInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AboutSeller = ({ authorInfo }) => {
  // IF LESS THAN 1 MINUTE MEAN ONLINE
  const online = authorInfo.lastLogin + 60000 > Date.now();
  return (
    <StyledWrapper>
      <StyledUserInfo>
        {authorInfo.avatar ? (
          <StyledAvatar
            src={`${BASE_URL}/${authorInfo.avatar}`}
            alt="user avatar"
          />
        ) : (
          <DefaultAvatar
            productDetails
            nickNameProvided={authorInfo.nickName}
          />
        )}
        <StyledDetails>
          <StyledSingleInfo className="big">
            <StyledIcon src={UserIcon} alt="user icon" />
            <StyledLink to={`/user/${authorInfo.nickName}`}>
              {authorInfo.nickName}
            </StyledLink>
          </StyledSingleInfo>
          <StyledSingleInfo>
            <StyledIcon src={PinIcon} alt="pin icon" />
            <span>{authorInfo.location}</span>
          </StyledSingleInfo>
          <StyledSingleInfo>
            <StyledDot className={online ? "green" : "red"} />
            <StyledOnlineInfo>
              <span>
                {online ? "Online" : "Offline, "}
                {!online && moment(authorInfo.lastLogin).fromNow()}
              </span>
            </StyledOnlineInfo>
          </StyledSingleInfo>
        </StyledDetails>
      </StyledUserInfo>
      <UserProducts
        nickName={authorInfo.nickName}
        productsIds={authorInfo.products}
      />
    </StyledWrapper>
  );
};

AboutSeller.propTypes = {
  authorInfo: PropTypes.object.isRequired,
};

export default AboutSeller;
