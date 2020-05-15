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
    background: ${theme.colors.primary};
  }
  &.red {
    background: ${theme.colors.secondary};
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
        <StyledAvatar src={UserIcon} alt="user avatar" />
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
            {/* <StyledIcon src={OfflineIcon} alt="offline icon" /> */}
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

AboutSeller.propTypes = {
  authorInfo: PropTypes.object.isRequired,
};

export default AboutSeller;
