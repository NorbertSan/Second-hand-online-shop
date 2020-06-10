import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "utils/theme";
import { useLocation } from "react-router-dom";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";
// REDUX STUFF
import { useSelector } from "react-redux";
// COMPONENTS
import Button from "components/atoms/Button";
import NickName from "components/atoms/NickName";
import Logout from "./Logout";
import GenderFilters from "./GenderFilters";
import GreyBackground from "components/atoms/GreyBackground";
import DefaultAvatar from "utils/DefaultAvatar";
// ANIMATIONS
import { menuAppear } from "utils/keyframesAnimations";

const StyledMenuList = styled.ul`
  margin: 0;
  list-style: none;
  position: absolute;
  top: 0;
  /* right: 0; */
  background: ${theme.colors.whiteish};
  z-index: 15;
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 15px 15px 15px;
  animation: ${menuAppear} 0.4s ease forwards;
  @media screen and (min-width: 760px) {
    padding: 100px 60px 15px 60px;
  }
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
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
const StyledAuthLinks = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  align-self: flex-start;
  margin-top: 40px;
  width: 100%;
`;
const StyledAuthLink = styled.li`
  display: block;
  padding: 10px;
  box-shadow: 0 0 2px grey;
  font-weight: bold;
  margin-bottom: 6px;
  background: #fff;
  position: relative;
  font-size: ${theme.fontSize.s};
`;

const Menu = ({ toggleMenuOpen }) => {
  const auth = useSelector((state) => state.user.auth);
  const avatar = useSelector((state) => state.user.avatar);
  const nickName = useSelector((state) => state.user.nickName);
  const menuRef = useRef(null);
  const location = useLocation();
  useDetectClickOutside(menuRef, toggleMenuOpen);
  return (
    <>
      <GreyBackground />
      <StyledMenuList ref={menuRef}>
        {auth && (
          <StyledUserPanel>
            <StyledUserInfo>
              <DefaultAvatar
                avatar={avatar}
                nickName={nickName}
                smallMenuIcon
              />

              <NickName black big>
                {nickName}
              </NickName>
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
        {auth && (
          <>
            <StyledAuthLinks>
              <StyledAuthLink
                onClick={() => toggleMenuOpen(false)}
                as={Link}
                to="/account/settings"
              >
                Account settings
              </StyledAuthLink>
              <StyledAuthLink
                as={Link}
                to="/account/purchases"
                onClick={() => toggleMenuOpen(false)}
              >
                Purchases
              </StyledAuthLink>
              <StyledAuthLink
                as={Link}
                to="/account/sales"
                onClick={() => toggleMenuOpen(false)}
              >
                Sales
              </StyledAuthLink>
            </StyledAuthLinks>
            <Logout />
          </>
        )}
      </StyledMenuList>
    </>
  );
};
export default Menu;
