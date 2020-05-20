import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
// ICONS
import BlueMail from "assets/icons/blueMail.svg";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 15px 0 0;
`;
const StyledButton = styled.button`
  border: none;
  background: transparent;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: 15px;
`;
const StyledIcon = styled.img`
  width: 100%;
`;

const FuncionalityIcons = () => {
  const { nickName } = useParams();
  return (
    <StyledWrapper>
      <StyledButton as={Link} to={`/messages/${nickName}`}>
        <StyledIcon src={BlueMail} alt="mail icon" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default FuncionalityIcons;
