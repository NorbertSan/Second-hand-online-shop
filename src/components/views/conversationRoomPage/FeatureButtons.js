import React, { memo, useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import PropTypes from "prop-types";
// ICONS
import SmileIcon from "assets/icons/smile.svg";
import AttachIcon from "assets/icons/attach.svg";

const StyledWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-top: 6px;
  position: relative;
`;
const StyledButtonIcon = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 6px;
  padding: 2px;
  border: none;
  background: none;
  img {
    width: 100%;
  }
`;
const StyledPickerWrapper = styled.div`
  width: 300px;
  position: absolute;
  top: 25px;
`;

const FeatureButtons = memo(
  ({ addEmoji }) => {
    const [emojiOpen, setEmojiOpen] = useState(false);
    const onEmojiClick = (e, emojiObject) => {
      e.preventDefault();
      addEmoji(emojiObject.emoji);
    };

    const toggleOpenEmojii = (e) => {
      e.preventDefault();
      setEmojiOpen((prevState) => !prevState);
    };
    return (
      <StyledWrapper>
        {emojiOpen && (
          <StyledPickerWrapper>
            <Picker onEmojiClick={onEmojiClick} />
          </StyledPickerWrapper>
        )}
        <StyledButtonIcon onClick={toggleOpenEmojii}>
          <img src={SmileIcon} alt="smile icon" />
        </StyledButtonIcon>
        <StyledButtonIcon>
          <img src={AttachIcon} alt="attach icon" />
        </StyledButtonIcon>
      </StyledWrapper>
    );
  },
  () => true
);

FeatureButtons.propTypes = {
  addEmoji: PropTypes.func.isRequired,
};

export default FeatureButtons;
