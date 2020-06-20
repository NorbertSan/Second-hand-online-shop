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
  top: 20px;
  z-index: 15;
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

const HoldSettings = ({ hidePanel, isLoggedUserAuthor, message }) => {
  const notificationRef = useRef(null);

  useDetectClickOutside(notificationRef, hidePanel, 1000);
  return (
    <StyledWrapper
      isLoggedUserAuthor={isLoggedUserAuthor}
      ref={notificationRef}
    >
      <HoldSettingsEmojiOptions
        hidePanel={hidePanel}
        message_id={message._id}
      />
      <HoldSettingsOptions
        isLoggedUserAuthor={isLoggedUserAuthor}
        message={message}
        hidePanel={hidePanel}
      />
    </StyledWrapper>
  );
};
HoldSettings.propTypes = {
  hidePanel: PropTypes.func.isRequired,
  isLoggedUserAuthor: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
};
export default HoldSettings;
