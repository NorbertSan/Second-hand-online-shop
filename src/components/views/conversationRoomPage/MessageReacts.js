import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import emojis from "utils/emojis";
import ReactAuthorsList from "./ReactAuthorsList";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 100%);
  display: flex;
  align-items: center;
  z-index: 10;
  ${({ isLoggedUserAuthor }) =>
    isLoggedUserAuthor
      ? css`
          right: 80px;
        `
      : css`
          left: 80px;
        `}
`;
const StyledElement = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  padding: 2px;
`;

const MessageReacts = ({ reacts, isLoggedUserAuthor }) => {
  const [indexedReacts, setIndexedReacts] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(false);
  useEffect(() => {
    if (reacts.length === 0) return;
    const compare = (a, b) => a.emojiIndex - b.emojiIndex;
    const sortedReacts = reacts.sort(compare);
    let indexedReacts = [
      {
        emojiIndex: sortedReacts[0].emojiIndex,
        amount: 0,
        authors: [],
      },
    ];
    sortedReacts.forEach((react, index, arr) => {
      let counter = 0;
      if (index > 0 && react.emojiIndex !== arr[index - 1].emojiIndex) {
        indexedReacts.push({
          emojiIndex: react.emojiIndex,
          amount: 1,
          authors: [react.author],
        });
        counter++;
      } else {
        indexedReacts[counter].amount++;
        indexedReacts[counter].authors.push(react.author);
      }
    });
    setIndexedReacts(indexedReacts);
  }, [reacts]);
  const setDisplayEmoji = (emojiIndex) => setSelectedEmoji(emojiIndex);
  if (reacts.length === 0) return null;
  return (
    <>
      {typeof selectedEmoji === "number" && (
        <ReactAuthorsList
          indexedReacts={indexedReacts}
          selectedEmoji={selectedEmoji}
          setSelectedEmoji={setSelectedEmoji}
        />
      )}
      <StyledWrapper isLoggedUserAuthor={isLoggedUserAuthor}>
        {indexedReacts.map((reactObj, index) => (
          <StyledElement key={index} onClick={() => setDisplayEmoji(index)}>
            <span>{emojis[reactObj.emojiIndex].emoji}</span>
            <span>{reactObj.amount}</span>
          </StyledElement>
        ))}
      </StyledWrapper>
    </>
  );
};

MessageReacts.propTypes = {
  reacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoggedUserAuthor: PropTypes.bool.isRequired,
};

export default MessageReacts;
