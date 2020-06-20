import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import styled from "styled-components";
// ICONS
import CopyIcon from "assets/icons/copy.svg";
import BinIcon from "assets/icons/bin.svg";
import { copyElement } from "utils/keyframesAnimations";
// REDUX STUFF
import { useDispatch } from "react-redux";
import { deleteMessage as deleteMessageAction } from "redux/actions/dataActions";

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  li {
    margin-right: 6px;
  }
  li:last-child {
    margin-right: 0;
  }
`;
const StyledElement = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  img {
    width: 16px;
    margin-bottom: 6px;
  }
  span {
    color: ${theme.colors.blackish};
    text-transform: capitalize;
    font-size: ${theme.fontSize.xs};
  }
  &.active {
    animation: ${copyElement} 1s ease-in-out;
    border-radius: 50%;
  }
`;

const HoldSettingsOptions = ({
  message: { body: content, _id: message_id },
  isLoggedUserAuthor,
  hidePanel,
}) => {
  const copyElement = useRef(null);
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState(false);
  const copyContent = () => {
    setActiveElement(true);
    const textarea = document.createElement("textarea");
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const copyAnimationEnd = () => setActiveElement(false);

  const removeMessage = () => {
    dispatch(deleteMessageAction(message_id));
    hidePanel(false);
  };

  return (
    <StyledWrapper>
      <li ref={copyElement}>
        <StyledElement
          onClick={copyContent}
          onAnimationEnd={copyAnimationEnd}
          className={activeElement ? "active" : ""}
        >
          <img src={CopyIcon} alt="copy icon" />
          <span>copy</span>
        </StyledElement>
      </li>
      {isLoggedUserAuthor && (
        <li>
          <StyledElement onClick={removeMessage}>
            <img src={BinIcon} alt="bion icon" />
            <span>remove</span>
          </StyledElement>
        </li>
      )}
    </StyledWrapper>
  );
};

HoldSettingsOptions.propTypes = {
  message: PropTypes.object.isRequired,
  isLoggedUserAuthor: PropTypes.bool.isRequired,
  hidePanel: PropTypes.func.isRequired,
};

export default HoldSettingsOptions;
