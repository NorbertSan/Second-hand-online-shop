import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// ICONS
import LogoutIcon from "assets/icons/logout.svg";
// REDUX STUFF
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/actions/userActions";

const StyledButton = styled.button`
  align-self: flex-end;
  display: flex;
  height: 30px;
  padding: 0;
  margin-top: 10px;
  margin-right: 20px;
  border: none;
  background: transparent;
  font-weight: bold;
  align-items: center;
`;
const StyledIcon = styled.img`
  width: 25px;
  margin-right: 5px;
`;

const Logout = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout(email));
    history.push("/signup/select_type");
  };
  return (
    <StyledButton onClick={handleLogout}>
      <StyledIcon src={LogoutIcon} alt="logout icon" />
      <span>Logout</span>
    </StyledButton>
  );
};

export default Logout;
