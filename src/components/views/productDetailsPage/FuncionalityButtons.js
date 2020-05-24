import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
// ICONS
import EmptyHeart from "assets/icons/emptyHeart.svg";
import BlueHeart from "assets/icons/blueHeart.svg";
import OrangeCartIcon from "assets/icons/orangeCart.svg";
import BlackMailIcon from "assets/icons/blackMail.svg";
// COMPONENTS
import Button from "components/atoms/Button";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "redux/actions/dataActions";
// ANIMATIONS
import { pulse } from "utils/keyframesAnimations";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;
const StyledButton = styled(Button)`
  margin: 7px 0;
  width: 220px;
  align-self: center;
  border-width: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

const FuncionalityButtons = ({ product_id, nickName }) => {
  const likesProducts = useSelector((state) => state.user.likesProducts);
  const auth = useSelector((state) => state.user.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleToggleLike = () =>
    auth
      ? dispatch(toggleLike(product_id))
      : history.push("/signup/select_type");
  return (
    <StyledWrapper>
      <StyledButton tertiary="tertiary" as={Link} to={`/messages/${nickName}`}>
        <span>Ask for product</span>
        <StyledIcon src={BlackMailIcon} alt="mail icon" />
      </StyledButton>
      <StyledButton secondary>
        <span>Buy Now</span>
        <StyledIcon src={OrangeCartIcon} alt="cart icon" />
      </StyledButton>
      <StyledButton
        onClick={handleToggleLike}
        className={
          likesProducts && likesProducts.includes(product_id)
            ? "blueish"
            : "greish"
        }
        tertiary
      >
        <span>Add to favourites</span>
        <StyledIcon
          className={
            likesProducts && likesProducts.includes(product_id) && "like"
          }
          src={
            likesProducts && likesProducts.includes(product_id)
              ? BlueHeart
              : EmptyHeart
          }
          alt="heart icon"
        />
      </StyledButton>
    </StyledWrapper>
  );
};

FuncionalityButtons.propTypes = {
  product_id: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
};

export default FuncionalityButtons;
