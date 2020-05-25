import React, { useEffect, useState } from "react";
import theme from "utils/theme";
import styled, { css } from "styled-components";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
// ICONS
import EmptyHeart from "assets/icons/emptyHeart.svg";
import BlueHeart from "assets/icons/blueHeart.svg";
import OrangeCartIcon from "assets/icons/orangeCart.svg";
import GreyCartIcon from "assets/icons/greyCart.svg";
import BlackMailIcon from "assets/icons/blackMail.svg";
// COMPONENTS
import Button from "components/atoms/Button";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "redux/actions/dataActions";
import { ADD_SHOPPING_LIST } from "redux/types";
// ANIMATIONS
import { pulse, slideUpAndDisappear } from "utils/keyframesAnimations";

const StyledWrapper = styled.div`
  margin: 20px 0;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    height: 8px;
    background: ${theme.colors.whiteish};
    width: 100px;
    z-index: 9;
    display: none;
  }
  ${({ disable }) =>
    disable &&
    css`
      border: 1px solid ${theme.colors.secondary};
      &:after {
        display: block;
      }
    `}
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  margin: 10px 0 10px 0;
  flex-direction: column;
  position: relative;
  ${({ disable }) =>
    disable &&
    css`
      opacity: 0.25;
      pointer-events: none;
    `}
`;
const StyledButton = styled(Button)`
  margin: 7px 0;
  width: 220px;
  align-self: center;
  border-width: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &.blueish {
    color: ${theme.colors.primary}!important;
    border-color: ${theme.colors.primary};
  }
  &.greish {
    color: grey !important;
    border: 1px solid grey;
    font-weight: medium;
  }
`;
const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  &.like {
    border-radius: 50%;
    animation: ${pulse} 1.5s 1 forwards;
  }
  &.board {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 2px;
    left: 10px;
  }
`;
const StyledTitle = styled.h4`
  color: ${theme.colors.secondary};
  text-align: center;
  margin: 0;
  z-index: 5;
  background: ${theme.colors.whiteish};
  padding: 3px 10px;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
`;
const StyledInCartAlert = styled.div`
  position: absolute;
  width: 130px;
  padding: 5px;
  background: ${theme.colors.secondary};
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: ${theme.fontSize.xs};
  animation: ${slideUpAndDisappear} 1.5s 0.5s 1 ease-in-out backwards;
`;

const FuncionalityButtons = ({ product, nickName }) => {
  const likesProducts = useSelector((state) => state.user.likesProducts);
  const shoppingList = useSelector((state) => state.data.shoppingList);
  const auth = useSelector((state) => state.user.auth);
  const loggedUserNickName = useSelector((state) => state.user.nickName);
  const [isAlreadyInShoppingList, setIsAlreadyInShoppingList] = useState(false);
  const [isAlertShown, setAlertShown] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAlreadyInShoppingList(
      shoppingList.find((item) => item._id === product._id) ? true : false
    );
  }, [shoppingList, product._id]);

  const handleToggleLike = () =>
    auth
      ? dispatch(toggleLike(product._id))
      : history.push("/signup/select_type");
  const addToShoppingList = () => {
    if (!isAlreadyInShoppingList)
      dispatch({ type: ADD_SHOPPING_LIST, payload: product });
    else {
      setAlertShown(true);
      setTimeout(() => setAlertShown(false), 2000);
    }
  };

  return (
    <StyledWrapper disable={loggedUserNickName === nickName}>
      {loggedUserNickName === nickName && (
        <StyledTitle>It is you product</StyledTitle>
      )}
      <StyledInnerWrapper disable={loggedUserNickName === nickName}>
        <StyledButton
          tertiary="tertiary"
          as={Link}
          to={`/messages/${nickName}`}
        >
          <span>Ask for product</span>
          <StyledIcon src={BlackMailIcon} alt="mail icon" />
        </StyledButton>
        <StyledButton
          className={!isAlreadyInShoppingList && "greish"}
          secondary
          onClick={addToShoppingList}
        >
          <span>Add to cart</span>
          <StyledIcon
            src={isAlreadyInShoppingList ? OrangeCartIcon : GreyCartIcon}
            alt="cart icon"
          />
          {isAlertShown && (
            <StyledInCartAlert>Already in cart</StyledInCartAlert>
          )}
        </StyledButton>
        <StyledButton
          onClick={handleToggleLike}
          className={
            likesProducts && likesProducts.includes(product._id)
              ? "blueish"
              : "greish"
          }
          tertiary
        >
          <span>Add to favourites</span>
          <StyledIcon
            className={
              likesProducts && likesProducts.includes(product._id) && "like"
            }
            src={
              likesProducts && likesProducts.includes(product._id)
                ? BlueHeart
                : EmptyHeart
            }
            alt="heart icon"
          />
        </StyledButton>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

FuncionalityButtons.propTypes = {
  product: PropTypes.object.isRequired,
  nickName: PropTypes.string.isRequired,
};

export default FuncionalityButtons;
