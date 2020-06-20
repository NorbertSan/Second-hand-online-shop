import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { reactMessage } from "redux/actions/dataActions";
import emojis from "utils/emojis";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
`;
const StyledEmoji = styled.li`
  margin: 0 2px;
  button {
    background: none;
    border: none;
    width: 22px;
    height: 22px;
    margin: 0;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HoldSettingsEmojiOptions = ({ message_id, hidePanel }) => {
  const dispatch = useDispatch();
  const handleEmojiReact = (emojiIndex) => {
    dispatch(reactMessage(message_id, emojiIndex));
    hidePanel(false);
  };
  return (
    <StyledWrapper>
      {emojis.map((emoji, index) => (
        <StyledEmoji key={index}>
          <button onClick={() => handleEmojiReact(index)}>
            <span role="img" aria-labelledby={emoji.label}>
              {emoji.emoji}
            </span>
          </button>
        </StyledEmoji>
      ))}
    </StyledWrapper>
  );
};

HoldSettingsEmojiOptions.propTypes = {
  message_id: PropTypes.string.isRequired,
  hidePanel: PropTypes.func.isRequired,
};

export default HoldSettingsEmojiOptions;
