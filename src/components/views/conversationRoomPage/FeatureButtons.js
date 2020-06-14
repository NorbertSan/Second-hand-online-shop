import React, { memo, useState, useRef } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import Picker from "emoji-picker-react";
import PropTypes from "prop-types";
// ICONS
import SmileIcon from "assets/icons/smile.svg";
import AttachIcon from "assets/icons/attach.svg";
import SendPhoto from "./SendPhoto";

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
const StyledError = styled.p`
  position: absolute;
  text-align: center;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.redish};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;

const FeatureButtons = memo(
  ({ addEmoji, setImage }) => {
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const onEmojiClick = (e, emojiObject) => {
      e.preventDefault();
      addEmoji(emojiObject.emoji);
    };

    const toggleOpenEmojii = (e) => {
      e.preventDefault();
      setEmojiOpen((prevState) => !prevState);
    };

    const fileInputRef = useRef(null);
    const handleAttachButtonclick = (e) => {
      e.preventDefault();
      fileInputRef.current.click();
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
        <StyledButtonIcon onClick={handleAttachButtonclick}>
          <img src={AttachIcon} alt="attach icon" />
        </StyledButtonIcon>
        <SendPhoto
          setErrors={setErrors}
          setImage={setImage}
          fileInputRef={fileInputRef}
        />
        {errors.image && <StyledError>{errors.image}</StyledError>}
      </StyledWrapper>
    );
  },
  () => true
);

FeatureButtons.propTypes = {
  addEmoji: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
};

export default FeatureButtons;
