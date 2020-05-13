import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import theme from "utils/theme";
import { useLocation } from "react-router-dom";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// REDUX STUFF
import { useSelector } from "react-redux";
// ICONS
import NoFaceIcon from "assets/icons/NoFaceIcon.svg";
// COMPONENTS
import Button from "components/atoms/Button";
import NickName from "components/atoms/NickName";
import Logout from "./Logout";
import GenderFilters from "./GenderFilters";
// ANIMATIONS
import { menuAppear } from "utils/keyframesAnimations";

const StyledMenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.whiteish};
  z-index: 9;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 15px 15px 15px;
  animation: ${menuAppear} 0.4s ease forwards;
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
`;
const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  ${({ big }) =>
    big &&
    css`
      padding: 5px;
      width: 40px;
      height: 40px;
    `}
`;

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const StyledUserPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: start;
  margin-bottom: 15px;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.secondary};
`;

const Menu = ({ toggleMenuOpen }) => {
  const auth = useSelector((state) => state.user.auth);
  const avatar = useSelector((state) => state.user.avatar);
  const nickName = useSelector((state) => state.user.nickName);
  const menuRef = useRef(null);
  const location = useLocation();
  useDetectClickOutside(menuRef, toggleMenuOpen);
  return (
    <StyledBackground>
      <StyledMenuList ref={menuRef}>
        {auth && (
          <StyledUserPanel>
            <StyledUserInfo>
              <StyledIcon big src={avatar || NoFaceIcon} alt="profile image" />
              <NickName big>{nickName}</NickName>
            </StyledUserInfo>
            <Link to={`/user/${nickName}`}>
              <Button secondary onClick={() => toggleMenuOpen(false)}>
                My account
              </Button>
            </Link>
          </StyledUserPanel>
        )}
        <StyledButton
          as={Link}
          to="/add_product"
          onClick={() => toggleMenuOpen(false)}
        >
          Sell now
        </StyledButton>
        {!auth && (
          <Link style={{ width: "100%" }} to="/signup/select_type">
            <StyledButton secondary onClick={() => toggleMenuOpen(false)}>
              Sign up | Sign in
            </StyledButton>
          </Link>
        )}
        {location.pathname !== "/products" && (
          <GenderFilters toggleMenuOpen={toggleMenuOpen} />
        )}
        {auth && <Logout />}
      </StyledMenuList>
    </StyledBackground>
  );
};
export default Menu;
