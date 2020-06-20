import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import styled, { css } from "styled-components";
import emojis from "utils/emojis";
// COMP
import GreyBackground from "components/atoms/GreyBackground";
import DefaultAvatar from "utils/DefaultAvatar";
// HOOKS
import useDetectClickOutside from "hooks/useDetectClickOutside";
import useGetUsersFromIds from "hooks/useGetUsersFromIds";

const StyledWrapper = styled.section`
  position: fixed;
  left: 50%;
  background: ${theme.colors.whiteish};
  top: 40%;
  transform: translate(-50%, -40%);
  z-index: 99;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px ${theme.colors.whiteish};
  border-radius: 5px;
`;
const StyledButtonsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;
const StyledButton = styled.button`
  padding: 5px 9px;
  background: none;
  border: none;
  margin: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  font-weight: 500;
  ${({ selected }) =>
    selected &&
    css`
      background: #ddd;
    `}
`;
const StyledAuthorsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const StyledAuthorWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 6px 20px;
  border-bottom: 1px solid #eee;
  img {
    margin-right: 10px;
  }
  span {
    font-size: ${theme.fontSize.s};
    font-weight: 500;
  }
`;

const ReactAuthorsList = ({
  indexedReacts,
  selectedEmoji,
  setSelectedEmoji,
}) => {
  const authorListRef = useRef(null);
  const [authorsList, setAuthorsList] = useState([]);
  useGetUsersFromIds(
    setAuthorsList,
    indexedReacts[selectedEmoji].authors,
    selectedEmoji
  );
  useDetectClickOutside(authorListRef, setSelectedEmoji);
  return (
    <>
      <GreyBackground />
      <StyledWrapper ref={authorListRef}>
        <StyledButtonsList>
          {indexedReacts.map((reactObj, index) => (
            <StyledButton
              key={index}
              selected={selectedEmoji === index}
              onClick={() => setSelectedEmoji(index)}
            >
              <span>{emojis[reactObj.emojiIndex].emoji}</span>
              <span>{reactObj.amount}</span>
            </StyledButton>
          ))}
        </StyledButtonsList>
        <StyledAuthorsList>
          {authorsList.map((author) => (
            <StyledAuthorWrapper key={author._id}>
              <DefaultAvatar
                followItem
                nickName={author.nickName}
                avatar={author.avatar}
              />
              <span>{author.nickName}</span>
            </StyledAuthorWrapper>
          ))}
        </StyledAuthorsList>
      </StyledWrapper>
    </>
  );
};

ReactAuthorsList.propTypes = {
  indexedReacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEmoji: PropTypes.number.isRequired,
  setSelectedEmoji: PropTypes.func.isRequired,
};

export default ReactAuthorsList;
