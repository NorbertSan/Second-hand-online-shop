import React from "react";
import styled from "styled-components";

// ICONS
import LogoutIcon from "assets/icons/logout.svg";
// REDUX STUFF
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/actions/userActions";

const StyledButton = styled.button`
  align-self: flex-end;
  width: 30px;
  height: 30px;
  padding: 0;
  margin-top: 10px;
  margin-right: 20px;
  border: none;
`;
const StyledIcon = styled.img`
  width: 100%;
`;

const Logout = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout(email));
  return (
    <StyledButton onClick={handleLogout}>
      <StyledIcon src={LogoutIcon} alt="logout icon" />
    </StyledButton>
  );
};

export default Logout;
