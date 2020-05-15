import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { addCommentValidator } from "utils/validators";
// ICON
import { ReactComponent as Icon } from "assets/icons/star.svg";
// COMPONENTS
import Textarea from "components/atoms/Textarea";
import Button from "components/atoms/Button";
import { appearAddComment } from "utils/keyframesAnimations";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";

const stars = [1, 2, 3, 4, 5];

const StyledWrapper = styled.form`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 2px solid grey;
  box-shadow: 0 0 3px grey;
  padding: 20px;
  background: ${theme.colors.whiteish};
  animation: ${appearAddComment} 0.2s ease-in-out 1;
  z-index: 9;
  display: flex;
  flex-direction: column;
`;
const StyledTextarea = styled(Textarea)`
  border: 1px solid ${theme.colors.secondary};
  box-shadow: 0 0 3px ${theme.colors.secondary};
  border-radius: 5px;
  color: grey;
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
  align-self: flex-end;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;
const StyledStarsWrapper = styled.div`
  display: flex;
  position: relative;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledStar = styled(Icon)`
  width: 17px;
  height: 17px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-right: 5px;
  path {
    fill: grey;
    stroke: #e5e5e5;
  }
  &.filled {
    path {
      fill: ${theme.colors.secondary};
    }
  }
`;
const StyledStarRequired = styled.span`
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  position: absolute;
  left: 0;
  bottom: -20px;
`;
const StyledBodyRequired = styled.span`
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;

const AddComment = ({ toggleAddCommentOpen, setComments }) => {
  const { nickName } = useParams();
  const [body, setBodyValue] = useState("");
  const [errors, setErrors] = useState({});
  const [starsNumber, setStarsNumber] = useState(0);
  const addCommentFormRef = useRef(null);
  useDetectClickOutside(addCommentFormRef, toggleAddCommentOpen);

  const addComment = async (data) => {
    try {
      const res = await axios.post(`/comment`, data);
      const comment = res.data;

      setComments((prevState) => [comment, ...prevState]);
      toggleAddCommentOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const data = { stars: starsNumber, body, nickName };
    const errorsFromValidator = addCommentValidator(data);
    if (Object.keys(errorsFromValidator).length > 0)
      setErrors(errorsFromValidator);
    else addComment(data);
  };
  return (
    <>
      <StyledBackground />
      <StyledWrapper ref={addCommentFormRef} onSubmit={handleAddComment}>
        {errors.body && <StyledBodyRequired>{errors.body}</StyledBodyRequired>}
        <StyledTextarea
          value={body}
          onChange={(e) => setBodyValue(e.target.value)}
          placeholder={`Rate user ${nickName}`}
        />
        <StyledInnerWrapper>
          <StyledStarsWrapper>
            <>
              {stars.map((star) => (
                <StyledStar
                  onClick={() => setStarsNumber(star)}
                  className={star <= starsNumber && "filled"}
                  key={star}
                  index={star}
                />
              ))}
              {errors.stars && (
                <StyledStarRequired>{errors.stars}</StyledStarRequired>
              )}
            </>
          </StyledStarsWrapper>
          <StyledButton secondary>Submit</StyledButton>
        </StyledInnerWrapper>
      </StyledWrapper>
    </>
  );
};

AddComment.propTypes = {
  toggleAddCommentOpen: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default AddComment;
