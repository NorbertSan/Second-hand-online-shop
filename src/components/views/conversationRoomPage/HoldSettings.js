import React, { useRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import useDetectClickOutside from "hooks/useDetectClickOutside";
import HoldSettingsOptions from "./HoldSettingsOptions";
import HoldSettingsEmojiOptions from "./HoldSettingsEmojiOptions";
import theme from "utils/theme";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${theme.colors.whiteish};
  padding: 7px;
  top: -10px;
  transform: translateY(-100%);
  box-shadow: 0 0 1px grey;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor
      ? css`
          right: 80px;
        `
      : css`
          left: 80px;
        `}
`;

const HoldSettings = ({ toggleDisplay, isLoggedUserAuthor, content }) => {
  const notificationRef = useRef(null);

  useDetectClickOutside(notificationRef, toggleDisplay, 1000);
  return (
    <StyledWrapper
      isLoggedUserAuthor={isLoggedUserAuthor}
      ref={notificationRef}
    >
      <HoldSettingsEmojiOptions />
      <HoldSettingsOptions content={content} />
    </StyledWrapper>
  );
};
HoldSettings.propTypes = {
  toggleDisplay: PropTypes.func.isRequired,
  isLoggedUserAuthor: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};
export default HoldSettings;
