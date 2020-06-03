import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import theme from "utils/theme";
// COMP
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledButton = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  font-size: ${theme.fontSize.s};
  position: relative;
  outline: none;
  padding: 5px;
  margin: 3px;
  flex: 1;
  color: grey;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background: grey;
  }
  ${({ active }) =>
    active &&
    css`
      &:after {
        background: ${theme.colors.primary};
      }
      background: rgba(0, 144, 158, 0.2);
      color: ${theme.colors.primary};
    `}
`;

const FollowSection = () => {
  const { followers, following } = useSelector((state) => state.user);
  const [sectionOpen, setSectionOpen] = useState(1); // 0 - hidden, 1-followers, 2 - followings
  const handleSectionChange = (e) => {
    const value = parseInt(e.target.value);
    if (sectionOpen === value) setSectionOpen(0);
    else setSectionOpen(value);
  };
  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        {followers && following && (
          <>
            <StyledButton
              value={1}
              active={sectionOpen === 1}
              onClick={handleSectionChange}
            >
              Followers ({followers.length})
            </StyledButton>
            <StyledButton
              value={2}
              active={sectionOpen === 2}
              onClick={handleSectionChange}
            >
              Following ({following.length})
            </StyledButton>
          </>
        )}
      </StyledInnerWrapper>
      {sectionOpen === 1 ? (
        <FollowersList />
      ) : (
        sectionOpen === 2 && <FollowingList />
      )}
    </StyledWrapper>
  );
};

export default FollowSection;
