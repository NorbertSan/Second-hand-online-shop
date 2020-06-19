import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CopyIcon from "assets/icons/copy.svg";
import theme from "utils/theme";
import BinIcon from "assets/icons/bin.svg";

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
`;
// const BinIcon

const HoldSettingsOptions = ({ content }) => {
  const copyContent = () => {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  return (
    <StyledWrapper>
      <li>
        <StyledElement onClick={copyContent}>
          <img src={CopyIcon} alt="copy icon" />
          <span>copy</span>
        </StyledElement>
      </li>
      <li>
        <StyledElement>
          <img src={BinIcon} alt="bion icon" />
          <span>remove</span>
        </StyledElement>
      </li>
    </StyledWrapper>
  );
};

HoldSettingsOptions.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HoldSettingsOptions;
