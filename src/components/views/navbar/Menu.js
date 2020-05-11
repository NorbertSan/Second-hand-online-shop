import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import theme from "utils/theme";

// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// REDUX STUFF
import { useSelector } from "react-redux";
// ICONS
import WomenIcon from "assets/icons/women.svg";
import KidIcon from "assets/icons/kid.svg";
import ManIcon from "assets/icons/man.svg";
import NoFaceIcon from "assets/icons/NoFaceIcon.svg";
// COMPONENTS
import Button from "components/atoms/Button";
import NickName from "components/atoms/NickName";
import Logout from "./Logout";

const appear = keyframes`
  0%{
    transform:translateY(-50px);
  }
  50%{
    transform:translateY(8px);
  }
  100%{
    transform:translateY(0);
  }
`;

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
  animation: ${appear} 0.4s ease forwards;
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
const StyledCategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${theme.colors.secondary};
  align-self: start;
  width: 100%;
  h4 {
    color: grey;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  padding: 17px;
  border-bottom: 1px solid ${theme.colors.secondary};
  span {
    font-weight: bold;
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSize.s};
  }
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
        <StyledCategoryList>
          <h4>Category</h4>
          <StyledLink to="/women" onClick={() => toggleMenuOpen(false)}>
            <StyledIcon src={WomenIcon} alt="woman icon" />
            <span>Women</span>
          </StyledLink>
          <StyledLink to="/men" onClick={() => toggleMenuOpen(false)}>
            <StyledIcon src={ManIcon} alt="man icon" />
            <span>Men</span>
          </StyledLink>
          <StyledLink to="/kids" onClick={() => toggleMenuOpen(false)}>
            <StyledIcon src={KidIcon} alt="kid icon" />
            <span>Kid</span>
          </StyledLink>
        </StyledCategoryList>
        {auth && <Logout />}
      </StyledMenuList>
    </StyledBackground>
  );
};
export default Menu;
