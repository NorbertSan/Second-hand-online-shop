import React from "react";
import styled from "styled-components";

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

const emojis = [
  {
    emoji: "😍",
    label: "love",
  },
  {
    emoji: "😂",
    label: "funny",
  },
  {
    emoji: "👎",
    label: "unlike",
  },
  {
    emoji: "👍",
    label: "like",
  },
];

const HoldSettingsEmojiOptions = () => {
  return (
    <StyledWrapper>
      {emojis.map((emoji, index) => (
        <StyledEmoji key={index}>
          <button>
            <span role="img" aria-labelledby={emoji.label}>
              {emoji.emoji}
            </span>
          </button>
        </StyledEmoji>
      ))}
    </StyledWrapper>
  );
};

export default HoldSettingsEmojiOptions;
