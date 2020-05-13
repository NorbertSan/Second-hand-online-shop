import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { useHistory } from "react-router-dom";
// ICONS
import EmptyHeart from "assets/icons/emptyHeart.svg";
import BlueHeart from "assets/icons/blueHeart.svg";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "redux/actions/dataActions";
// ANIMATION
import { pulse } from "utils/keyframesAnimations";

const StyledWrapper = styled.div`
  width: 40px;
  height: 15px;
  position: absolute;
  top: 3px;
  right: 0px;
  display: flex;
  justify-items: flex-end;
  align-items: center;
  font-size: ${theme.fontSize.xs};
`;
const StyledIcon = styled.img`
  width: 100%;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-left: 5px;
  padding: 0;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  &.like {
    animation: ${pulse} 1.5s 1 forwards;
  }
`;
const LikeButton = ({ likes, product_id }) => {
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
      <div>{likes}</div>
      <StyledButton
        className={
          likesProducts && likesProducts.includes(product_id) && "like"
        }
        onClick={handleToggleLike}
      >
        <StyledIcon
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

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  product_id: PropTypes.string.isRequired,
};

export default LikeButton;
